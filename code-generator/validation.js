function validations() {
    function validation( key ) {
        var error = ''

        let value = document.getElementById( key ).value
        switch( key ) {
            case 'dataset':
                if( struct['dataset']['content'] != null ) {
                    if( Array.isArray( struct['dataset']['content'] ) ) {
                        if( struct['dataset']['content'].length !== 0 ) {
                            if( typeof( struct['dataset']['content'][ 0 ] ) === 'object' ) {

                            } else {
                                error = 'Dataset: Rows are not type of Object'
                            }
                        } else {
                            error = 'Dataset: No rows found.'
                        }
                    } else {
                        error = 'Dataset: Data Structure is not Array'
                    }
                } else {
                    error = 'Dataset: Data could not loaded'
                }

                if( value !== struct['dataset']['url'] ) {
                    error = 'Dataset: Formdata is not in sync with Preview. Please reload Dataset.'
                }
                break;
            case 'y':
                value === '' ? error = 'Y: Y Is empty' : ''
                break;
            case 'x':
                try {
                    JSON.parse( value )
                } catch( e ) {
                    error = 'X: Array is not valid'
                }

                break;
            case 'options':
                try {
                    JSON.parse( value )
                } catch ( e ) {
                    error = 'Options: JSON is not valid'
                }
            break;
        }

        return error
    }

    errors = []
    Object
        .keys( struct['elements'] )
        .forEach( ( key ) => {
            errors.push( validation( key ) )
        })

    

    struct['valid'] = errors.join('') === ''
    if( !struct['valid'] ) {
        html = 'Error(s):<br>'
        errors
            .forEach( ( error ) => {
                error.length > 0 ? html += '- ' + error + '<br>' : ''
            })
        document.getElementById('d3_statosio').innerHTML = html
    }

    
    //valid ? document.getElementById('errors').innerHTML = ' OK' : ''
}
