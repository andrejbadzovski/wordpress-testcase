import { registerBlockType } from '@wordpress/blocks';

registerBlockType('api-plugin/api-settings', {
    title: 'API Settings',
    icon: 'admin-network',
    category: 'widgets',
    edit: () => <div>Manage API settings in the admin page.</div>,
    save: () => null,
});
