
<?php
function outside_register_team_cpt() {
    $labels = array(
        'name'               => 'Team Members',
        'singular_name'      => 'Team Member',
        'menu_name'          => 'Team Members',
        'add_new'            => 'Add New Member',
        'add_new_item'       => 'Add New Team Member',
        'edit_item'          => 'Edit Team Member',
        'view_item'          => 'View Team Member',
        'all_items'          => 'All Team Members',
    );
    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-groups',
        'supports'           => array( 'title', 'editor', 'thumbnail' ),
        'rewrite'            => array( 'slug' => 'team' ),
        'has_archive'        => true,
    );
    register_post_type( 'team', $args );
}
add_action( 'init', 'outside_register_team_cpt' );
