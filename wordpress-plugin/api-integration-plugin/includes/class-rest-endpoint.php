<?php

class REST_Endpoint {
    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'register_routes' ] );
    }

    public function register_routes() {
        register_rest_route( 'api-plugin/v1', '/config', [
            'methods'  => 'GET',
            'callback' => [ $this, 'get_api_config' ],
        ] );
    }

    public function get_api_config() {
        return [
            'api_key'    => get_option( 'api_key' ),
            'api_endpoint' => get_option( 'api_endpoint' ),
        ];
    }
}

new REST_Endpoint();
