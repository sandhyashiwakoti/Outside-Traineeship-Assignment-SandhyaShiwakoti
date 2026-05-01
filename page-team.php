<?php
/**
 * Template Name: Team Page
 */

get_header();

$departments = get_terms( array(
    'taxonomy'   => 'department',
    'hide_empty' => true,
) );

if ( ! empty( $departments ) && ! is_wp_error( $departments ) ) : ?>

    <div class='team-tabs'>
        <?php foreach ( $departments as $dept ) : ?>
            <button class='team-tab-btn' data-target='dept-<?php echo esc_attr( $dept->slug ); ?>'>
                <?php echo esc_html( $dept->name ); ?>
            </button>
        <?php endforeach; ?>
    </div>

    <?php foreach ( $departments as $dept ) : ?>
        <div class='team-tab-content' id='dept-<?php echo esc_attr( $dept->slug ); ?>'>
            <h2><?php echo esc_html( $dept->name ); ?></h2>

            <?php
            $team_query = new WP_Query( array(
                'post_type'      => 'team',
                'posts_per_page' => -1,
                'tax_query'      => array(
                    array(
                        'taxonomy' => 'department',
                        'field'    => 'slug',
                        'terms'    => $dept->slug,
                    ),
                ),
            ) );

            if ( $team_query->have_posts() ) : ?>
                <div class='team-grid'>
                    <?php while ( $team_query->have_posts() ) : $team_query->the_post(); ?>
                       <div class='team-card'>
                            <?php if ( has_post_thumbnail() ) : ?>
                            <?php the_post_thumbnail( 'thumbnail' ); ?>
                            <?php else : ?>
                                <img src='https://ui-avatars.com/api/?name=<?php echo urlencode( get_the_title() ); ?>&background=d0e4f7&color=4a90d9&size=128&rounded=true' alt='Avatar' />                            
                            <?php endif; ?>
                            <div class='team-card-info'>
                                <h3><?php the_title(); ?></h3>
                                <p class='position'><?php echo esc_html( get_post_meta( get_the_ID(), '_team_position', true ) ); ?></p>
                                <div class='team-contact-icons'>
                                    <span>📞</span>
                                    <span>✉️</span>
                                </div>
                            </div>
                        </div>
                    <?php endwhile; wp_reset_postdata(); ?>
                </div>
            <?php else : ?>
                <p>No team members found in this department.</p>
            <?php endif; ?>
        </div>
    <?php endforeach; ?>

<?php endif;

get_footer();
