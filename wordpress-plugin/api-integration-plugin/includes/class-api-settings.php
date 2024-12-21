<?php

class API_Settings {
    public function __construct() {
        add_action( 'admin_menu', [ $this, 'add_settings_page' ] );
        add_action( 'admin_init', [ $this, 'register_settings' ] );
    }

    public function add_settings_page() {
        add_options_page(
            'API Settings',
            'API Settings',
            'manage_options',
            'api-settings',
            [ $this, 'render_settings_page' ]
        );
    }

    public function register_settings() {
        register_setting( 'api-settings-group', 'api_key' );
        register_setting( 'api-settings-group', 'api_endpoint' );
    }

    public function render_settings_page() {
        ?>
        <div class="wrap">
            <h1>API Settings</h1>
            <form method="post" action="options.php">
                <?php
                settings_fields( 'api-settings-group' );
                do_settings_sections( 'api-settings-group' );
                ?>
                <table class="form-table">
                    <tr valign="top">
                        <th scope="row">API Key</th>
                        <td><input type="text" name="api_key" value="<?php echo esc_attr( get_option( 'api_key' ) ); ?>" /></td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">API Endpoint</th>
                        <td><input type="text" name="api_endpoint" value="<?php echo esc_attr( get_option( 'api_endpoint' ) ); ?>" /></td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
}

new API_Settings();
