<?php
function outside_register_department_taxonomy() {
    $labels = array(
        'name'              => 'Departments',
        'singular_name'     => 'Department',
        'menu_name'         => 'Departments',
        'all_items'         => 'All Departments',
        'add_new_item'      => 'Add New Department',
        'edit_item'         => 'Edit Department',
    );
    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'rewrite'           => array( 'slug' => 'department' ),
    );
    register_taxonomy( 'department', array( 'team' ), $args );
}
add_action( 'init', 'outside_register_department_taxonomy' );