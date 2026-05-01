<?php
function outside_team_metabox() {
    add_meta_box(
        'team_details',
        'Team Member Details',
        'outside_team_metabox_callback',
        'team',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'outside_team_metabox' );

function outside_team_metabox_callback( $post ) {
    wp_nonce_field( 'outside_team_nonce_action', 'outside_team_nonce' );
    $position   = get_post_meta( $post->ID, '_team_position', true );
    $experience = get_post_meta( $post->ID, '_team_experience', true );
    $address    = get_post_meta( $post->ID, '_team_address', true );
    $contact    = get_post_meta( $post->ID, '_team_contact', true );
    ?>
    <table class='form-table'>
        <tr>
            <th><label for='team_position'>Position</label></th>
            <td><input type='text' id='team_position' name='team_position'
            value='<?php echo esc_attr( $position ); ?>' class='regular-text' /></td>
        </tr>
        <tr>
            <th><label for='team_experience'>Years of Experience</label></th>
            <td><input type='number' id='team_experience' name='team_experience'
            value='<?php echo esc_attr( $experience ); ?>' class='small-text' /></td>
        </tr>
        <tr>
            <th><label for='team_address'>Address</label></th>
            <td><textarea id='team_address' name='team_address'
            rows='3' class='regular-text'><?php echo esc_textarea( $address ); ?></textarea></td>
        </tr>
        <tr>
            <th><label for='team_contact'>Contact Number</label></th>
            <td><input type='text' id='team_contact' name='team_contact'
            value='<?php echo esc_attr( $contact ); ?>' class='regular-text' /></td>
        </tr>
    </table>
    <?php
}

function outside_team_save_meta( $post_id ) {
    if ( ! isset( $_POST['outside_team_nonce'] ) ) return;
    if ( ! wp_verify_nonce( $_POST['outside_team_nonce'], 'outside_team_nonce_action' ) ) return;
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;

    $fields = array( 'team_position', 'team_experience', 'team_address', 'team_contact' );
    foreach ( $fields as $field ) {
        if ( isset( $_POST[ $field ] ) ) {
            update_post_meta( $post_id, '_' . $field,
            sanitize_text_field( $_POST[ $field ] ) );
        }
    }
}
add_action( 'save_post', 'outside_team_save_meta' );
