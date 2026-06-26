// Sidebar loader for the documentation site.
// Reads src/data/manifest.json (synced from the spec repo by sync-spec.mjs) and
// produces the Starlight sidebar items for the specification, grouped by
// sidebar_group. Robust by design — if the manifest is missing (fresh checkout,
// sync not yet run), a minimal sidebar is returned so the build never hard-fails
// on a cold start.

import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'


const __dirname = dirname( fileURLToPath( import.meta.url ) )
const MANIFEST_PATH = resolve( __dirname, 'manifest.json' )

// Lockstep with the spec repo's generate-manifest.mjs SIDEBAR_GROUP_BY_ORDER.
// `specification` stays as the ultimate label fallback for any unlabelled key.
const GROUP_LABELS = {
    foundations: 'Foundations',
    engineering: 'Engineering',
    delivery: 'Delivery & Safety',
    specification: 'Specification'
}

const GROUP_ORDER = [ 'foundations', 'engineering', 'delivery' ]


class SidebarLoader {
    static buildSidebar() {
        const manifest = SidebarLoader.#loadManifest()
        if( !manifest ) {
            return SidebarLoader.#minimalSidebar()
        }

        const specVersion = SidebarLoader.#versionOf( { value: manifest.spec_version } )
        const specItems = SidebarLoader.#buildSpecItems( { manifest } )

        return { specItems, specVersion }
    }


    static #versionOf( { value } ) {
        return typeof value === 'string' && value.length > 0 ? value : '0.0.0'
    }


    static #loadManifest() {
        if( !existsSync( MANIFEST_PATH ) ) {
            return null
        }
        const raw = readFileSync( MANIFEST_PATH, 'utf8' )
        return JSON.parse( raw )
    }


    static #buildSpecItems( { manifest } ) {
        const files = Array.isArray( manifest.files ) ? manifest.files : []
        const sorted = [ ...files ].sort( ( a, b ) => a.order - b.order )

        const buckets = {}
        sorted.forEach( ( file ) => {
            const key = typeof file.sidebar_group === 'string' ? file.sidebar_group : 'specification'
            if( !buckets[ key ] ) {
                buckets[ key ] = []
            }
            buckets[ key ].push( {
                label: file.title,
                slug: `specification/${ file.slug }`
            } )
        } )

        const orderedKeys = GROUP_ORDER.filter( ( key ) => buckets[ key ] )
        const extraKeys = Object
            .keys( buckets )
            .filter( ( key ) => !GROUP_ORDER.includes( key ) )
        const allKeys = [ ...orderedKeys, ...extraKeys ]

        return allKeys.map( ( key ) => {
            return {
                label: GROUP_LABELS[ key ] ?? key,
                collapsed: false,
                items: buckets[ key ]
            }
        } )
    }


    static #minimalSidebar() {
        return {
            specItems: [],
            specVersion: '0.0.0'
        }
    }
}


export { SidebarLoader }
