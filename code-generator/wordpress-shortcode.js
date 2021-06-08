function wordpress_shortcodes() {
    function value_prepare( key, value ) {
        switch( key ) {
            case 'x':
                value = encodeURIComponent( value )
                break;
            case 'options':
                list = [ '{', '}' ]

                if( value === '' || value === '{}' ) {
                    value = '{}'
                }
                value = encodeURIComponent( value )
                break;
        }
        return value
    }

    
    let p = ''
    p += '[statosio '
    p += Object
        .keys( struct['elements'] )
        .map( ( key ) => {
            value = document.getElementById( key ).value 
            value = value_prepare( key, value )
            str = ''
            str += key
            str += '="'
            str += value
            str += '"'
            return str
        })
        .join( ' ' )
    p += ']'

    document.getElementById( 'p134_code_wordpress' ).value = p

    return true
}



function javascript_shortcodes() {
    let template = `
<!DOCTYPE html>
<head>
    <title>d3.statosio - viewTranslateMultiplicator</title>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <meta content="utf-8" http-equiv="encoding">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/6.2.0/d3.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/statosio/0.9/statosio.js"></script>
</head>
<body>
    <script>
        // Load Sample Dataset
        d3.json( "<<--dataset-->>" )
            .then( ( file ) => {
                // Generate chart
                d3.statosio( 
                    file, 
                    "<<--y-->>", 
                    <<--x-->>, 
                    <<--options-->>
                )
            } )
    </script>
</body>
`;

    Object
        .keys( struct['elements'] )
        .map( ( key ) => {
            value = document.getElementById( key ).value 
            template = template.replace( '<<--' + key + '-->>', value)
            return str
        } )

    document.getElementById( 'p134_code_javascript' ).value = template

    return true
}


function ruby_shortcodes() {
    function value_prepare( key, value ) {
        switch( key ) {
            case 'options':
                value = value.replaceAll( '":', "=>" )
                break;
        }
        return value
    }

    let template = `require 'statosio'
require 'open-uri'
require 'json'

# Initialize Statosio
statosio = Statosio::Generate.new

# Load Sample Dataset
url = '<<--dataset-->>'
content = URI.open( url ).read
dataset = JSON.parse( content )

# Generate chart as .svg
chart = statosio.svg(
    dataset: dataset,
    x: <<--x-->>,
    y: '<<--y-->>',
    options: <<--options-->>
)
    `;

    Object
        .keys( struct['elements'] )
        .map( ( key ) => {
            value = document.getElementById( key ).value 
            value = value_prepare( key, value )
            template = template.replace( '<<--' + key + '-->>', value )
            return str
        } )

    document.getElementById( 'p134_code_ruby' ).value = template

    return true
}