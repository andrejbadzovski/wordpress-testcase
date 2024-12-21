<?php
/*
Plugin Name: API Integration Plugin
Description: Manage API settings and expose REST API for integration.
Version: 1.0
Author: Your Name
*/

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once plugin_dir_path( __FILE__ ) . 'includes/class-api-settings.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/class-rest-endpoint.php';

add_action( 'enqueue_block_editor_assets', function() {
    wp_enqueue_script(
        'api-plugin-block',
        plugin_dir_url( __FILE__ ) . 'assets/block.js',
        [ 'wp-blocks', 'wp-element' ],
        '1.0',
        true
    );
} );
