// Mermaid-Zoom — (Memo 015, Kap 6). Lightbox for rehype-mermaid inline-svg.
// rehype-mermaid renders bare <svg id="mermaid-…"> (no .mermaid wrapper). Vanilla, no deps.
//
// Bug 5 fix (05-memo-init-bugs finding #5): the memo-init lightbox was mouse-only
// and had no focus management. This version makes the diagram a keyboard-operable
// trigger (tabindex + role=button + Enter/Space), moves focus into the overlay on
// open and restores it to the trigger on close, traps Tab within the overlay, and
// marks the background `inert` while the modal is open.

const OVERLAY_ID = 'a6b8-mermaid-overlay'
const TARGET_SELECTOR = '.sl-markdown-content svg[id^="mermaid"]'

let lastTrigger = null

const setBackgroundInert = ( inert ) => {
    Array.from( document.body.children ).forEach( ( child ) => {
        if( child.id === OVERLAY_ID ) { return }
        if( inert ) { child.setAttribute( 'inert', '' ) }
        else { child.removeAttribute( 'inert' ) }
    } )
}

const ensureOverlay = () => {
    const existing = document.getElementById( OVERLAY_ID )
    if( existing ) { return existing }
    const overlay = document.createElement( 'div' )
    overlay.id = OVERLAY_ID
    overlay.className = 'mermaid-overlay'
    overlay.setAttribute( 'role', 'dialog' )
    overlay.setAttribute( 'aria-modal', 'true' )
    overlay.setAttribute( 'aria-label', 'Diagram fullscreen' )

    const stage = document.createElement( 'div' )
    stage.className = 'mermaid-overlay__stage'

    const closeBtn = document.createElement( 'button' )
    closeBtn.type = 'button'
    closeBtn.className = 'mermaid-overlay__close'
    closeBtn.setAttribute( 'aria-label', 'Close diagram' )
    closeBtn.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>'
    closeBtn.addEventListener( 'click', ( e ) => { e.stopPropagation(); closeOverlay() } )

    overlay.appendChild( closeBtn )
    overlay.appendChild( stage )

    // Backdrop click closes; a click inside the stage should not.
    overlay.addEventListener( 'click', ( event ) => {
        if( event.target === overlay || event.target === stage ) { closeOverlay() }
    } )

    // Focus trap: only the close button is focusable, so keep Tab on it.
    overlay.addEventListener( 'keydown', ( event ) => {
        if( event.key === 'Tab' ) {
            event.preventDefault()
            closeBtn.focus()
        }
    } )

    document.body.appendChild( overlay )
    return overlay
}

const openOverlay = ( svgEl ) => {
    lastTrigger = svgEl
    const overlay = ensureOverlay()
    const stage = overlay.querySelector( '.mermaid-overlay__stage' )
    const clone = svgEl.cloneNode( true )
    // Keep the id: rehype-mermaid embeds theme styles as id-scoped rules
    // (`#mermaid-N .node rect { fill: … }`). Removing it makes the SVG fall back
    // to default black fills. Duplicate-id risk is harmless (original is behind
    // the overlay). Clear its interactive semantics on the clone.
    clone.removeAttribute( 'style' )
    clone.removeAttribute( 'tabindex' )
    clone.removeAttribute( 'role' )
    clone.style.width = '100%'
    clone.style.height = '100%'
    clone.style.maxWidth = 'none'
    clone.style.maxHeight = 'none'
    stage.innerHTML = ''
    stage.appendChild( clone )

    overlay.classList.add( 'is-open' )
    setBackgroundInert( true )
    overlay.querySelector( '.mermaid-overlay__close' ).focus()
}

const closeOverlay = () => {
    const overlay = document.getElementById( OVERLAY_ID )
    if( !overlay || !overlay.classList.contains( 'is-open' ) ) { return }
    overlay.classList.remove( 'is-open' )
    const stage = overlay.querySelector( '.mermaid-overlay__stage' )
    if( stage ) { stage.innerHTML = '' }
    setBackgroundInert( false )
    if( lastTrigger && typeof lastTrigger.focus === 'function' ) { lastTrigger.focus() }
    lastTrigger = null
}

let wired = false

const initMermaidZoom = () => {
    // Make each diagram a keyboard-operable, labeled trigger. Idempotent guard.
    const targets = document.querySelectorAll( TARGET_SELECTOR )
    targets.forEach( ( svg ) => {
        if( svg.dataset.mermaidZoom === 'true' ) { return }
        svg.dataset.mermaidZoom = 'true'
        svg.style.cursor = 'zoom-in'
        svg.setAttribute( 'tabindex', '0' )
        svg.setAttribute( 'role', 'button' )
        if( !svg.getAttribute( 'aria-label' ) ) { svg.setAttribute( 'aria-label', 'Open diagram fullscreen' ) }
    } )

    if( wired ) { return }
    wired = true

    // Delegated click — also catches diagrams rendered after astro:page-load.
    document.addEventListener( 'click', ( event ) => {
        const svg = event.target.closest( TARGET_SELECTOR )
        if( svg ) { openOverlay( svg ) }
    } )

    // Keyboard: Enter/Space opens the focused diagram; Escape closes the overlay.
    document.addEventListener( 'keydown', ( event ) => {
        if( event.key === 'Escape' ) { closeOverlay(); return }
        if( event.key === 'Enter' || event.key === ' ' ) {
            const active = document.activeElement
            if( active && active.matches && active.matches( TARGET_SELECTOR ) ) {
                event.preventDefault()
                openOverlay( active )
            }
        }
    } )
}

document.addEventListener( 'DOMContentLoaded', initMermaidZoom )
document.addEventListener( 'astro:page-load', initMermaidZoom )

export { initMermaidZoom }
