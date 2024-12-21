<?php

add_action('admin_menu', function () {
    add_menu_page(
        'API Integration Settings', 
        'API Settings',          
        'manage_options',        
        'api-integration-settings',
        'api_integration_settings_page' 
    );
});

function api_integration_settings_page() {
    ?>
    <div class="wrap">
        <h1>API Integration Settings</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('api_integration_settings_group');
            do_settings_sections('api-integration-settings');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}

add_action('admin_init', function () {
    register_setting('api_integration_settings_group', 'api_integration_api_key');
    register_setting('api_integration_settings_group', 'api_integration_api_endpoint');

    add_settings_section(
        'api_integration_settings_section', 
        'API Configuration', 
        null, 
        'api-integration-settings'
    );

    add_settings_field(
        'api_integration_api_key',
        'API Key',
        function () {
            $value = get_option('api_integration_api_key', '');
            echo "<input type='text' name='api_integration_api_key' value='" . esc_attr($value) . "' />";
        },
        'api-integration-settings',
        'api_integration_settings_section'
    );

    add_settings_field(
        'api_integration_api_endpoint',
        'API Endpoint',
        function () {
            $value = get_option('api_integration_api_endpoint', '');
            echo "<input type='text' name='api_integration_api_endpoint' value='" . esc_attr($value) . "' />";
        },
        'api-integration-settings',
        'api_integration_settings_section'
    );
});
?>
