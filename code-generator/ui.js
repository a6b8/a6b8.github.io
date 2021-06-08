function preview_chart() {
    function statosio( _dataset, _y, _x, _options ) {
        try {
            d3.statosio( 
                _dataset, 
                _y, 
                JSON.parse( decodeURIComponent( _x ) ), 
                JSON.parse( decodeURIComponent( _options ) )
            ) 
        } catch( e ) {
            document.getElementById('d3_statosio').innerHTML = 'Some values or keys are not correct.'
        }
        
    }

    function shortcode_parse() {
        result = {}
        shortcode = document.getElementById('p134_code_wordpress').value

        start = "[statosio "

        str = shortcode.substring( start.length, shortcode.length-1)
        str
            .split(' ')
            .forEach( ( kv ) => {
                item = kv.split('=')
                result[ item[ 0 ] ] = item[ 1 ].substring( 1,item[ 1 ].length-1)
        } )
        return result
    }

    
    params = shortcode_parse()


    let url = document.getElementById('dataset').value
    if( struct['valid'] ) {
        document.getElementById('d3_statosio').innerHTML = ''
        statosio( struct['dataset']['content'], params['y'], params['x'], params['options'] )   
        validations()
    } else {
        //document.getElementById('d3_statosio').innerHTML = 'Can not show preview. Please read Validation Error(s) below.'
    }
}


function button_code_copy( key ) {
    str = 'p134_code_' + key
    let textarea = document.getElementById( str )
    textarea.select()
    document.execCommand( "copy" )
}


function load_dataset() {
    function get_dataset( url, callback ) {
        var xhr = new XMLHttpRequest()
        xhr.open( 'GET', url, true )
        xhr.responseType = 'json'
        xhr.onload = function() {
            var status = xhr.status
            if ( status === 200 ) {
                callback( null, xhr.response )
            } else {
                callback( status, xhr.response )
            }
        }
        xhr.onerror = function( e ) {
            callback( 404, xhr.response )
        };

        xhr.send()
    }

    struct['dataset']['url'] = document.getElementById('dataset').value
    
    get_dataset(
        struct['dataset']['url'],
        function( err, data ) {
            if ( err !== null ) {
                struct['dataset']['content'] = null
                validations()
            } else {
                struct['dataset']['content'] = data
                validations()
                preview_chart()
            }
        }
    )
}