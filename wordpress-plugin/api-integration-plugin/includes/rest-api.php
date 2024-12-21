<?php
add_action('rest_api_init', function () {
    register_rest_route('api-integration/v1', '/config', array(
        'methods' => 'GET',
        'callback' => 'api_integration_get_config',
        'permission_callback' => '__return_true',
    ));
});

function api_integration_get_config() {
    $api_key = get_option('api_integration_api_key', false);
    $api_endpoint = get_option('api_integration_api_endpoint', false);

    return array(
        'api_key' => $api_key,
        'api_endpoint' => $api_endpoint,
    );
}
?>
