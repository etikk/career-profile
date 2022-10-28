use speedy2d::color::Color;
use speedy2d::dimen::Vector2;
use speedy2d::shape::Rectangle;
use speedy2d::Graphics2D;

pub fn draw_road(
    graphics: &mut Graphics2D,
    left_stop: bool,
    right_stop: bool,
    up_stop: bool,
    down_stop: bool,
) {
    let mut road_vec: Vec<(u32, u32, u32, u32)> = Vec::new();
    road_vec.push((0, 280, 275, 280));
    road_vec.push((275, 280, 280, 275));
    road_vec.push((280, 275, 280, 0));

    road_vec.push((320, 0, 320, 275));
    road_vec.push((320, 275, 325, 280));
    road_vec.push((325, 280, 600, 280));

    road_vec.push((0, 320, 275, 320));
    road_vec.push((275, 320, 280, 325));
    road_vec.push((280, 325, 280, 600));

    road_vec.push((320, 600, 320, 325));
    road_vec.push((320, 325, 325, 320));
    road_vec.push((325, 320, 600, 320));

    // draws intersection background
    for line in road_vec {
        graphics.draw_line(
            Vector2::new(line.0 as f32, line.1 as f32),
            Vector2::new(line.2 as f32, line.3 as f32),
            2.0,
            Color::BLACK,
        );
    }

    let mut spacer: f32 = 12.5;
    for _ in 0..30 {
        graphics.draw_line(
            (300.0, (-10.0 + spacer) as f32),
            (300.0, (5.0 + spacer) as f32),
            1.0,
            Color::GRAY,
        );
        graphics.draw_line(
            ((-10.0 + spacer) as f32, 300.0),
            ((5.0 + spacer) as f32, 300.0),
            1.0,
            Color::GRAY,
        );
        spacer += 20.0;
    }

    let stop_lines: Vec<(u32, u32, u32, u32)> = vec![
        (280, 280, 295, 280),
        (280, 320, 280, 305),
        (320, 320, 305, 320),
        (320, 280, 320, 295),
    ];

    for line in stop_lines {
        graphics.draw_line(
            Vector2::new(line.0 as f32, line.1 as f32),
            Vector2::new(line.2 as f32, line.3 as f32),
            3.0,
            Color::GRAY,
        );
    }

    let light_boxes: Vec<(u32, u32, u32, u32)> = vec![
        (240, 215, 270, 270),
        (215, 330, 270, 360),
        (330, 330, 360, 385),
        (330, 240, 385, 270),
    ];

    for el in light_boxes {
        graphics.draw_rectangle(
            Rectangle::new(
                Vector2::new(el.0 as f32, el.1 as f32),
                Vector2::new(el.2 as f32, el.3 as f32),
            ),
            Color::BLACK,
        );
    }

    let stands: Vec<(u32, u32, u32, u32)> = vec![
        (255, 215, 255, 160),
        (215, 345, 160, 345),
        (345, 385, 345, 440),
        (385, 255, 440, 255),
    ];

    for line in stands {
        graphics.draw_line(
            Vector2::new(line.0 as f32, line.1 as f32),
            Vector2::new(line.2 as f32, line.3 as f32),
            1.0,
            Color::BLACK,
        );
    }

    if up_stop == false {
        graphics.draw_circle(Vector2::new(345.0, 370.0), 10.0, Color::GREEN);
    } else {
        graphics.draw_circle(Vector2::new(345.0, 345.0), 10.0, Color::RED);
        // graphics.draw_circle(Vector2::new(345.0, 370.0), 10.0, Color::GREEN);
    };
    if down_stop == false {
        graphics.draw_circle(Vector2::new(255.0, 230.0), 10.0, Color::GREEN);
    } else {
        graphics.draw_circle(Vector2::new(255.0, 255.0), 10.0, Color::RED);
        // graphics.draw_circle(Vector2::new(255.0, 230.0), 10.0, Color::GREEN);
    };
    if left_stop == false {
        graphics.draw_circle(Vector2::new(230.0, 345.0), 10.0, Color::GREEN);
    } else {
        graphics.draw_circle(Vector2::new(255.0, 345.0), 10.0, Color::RED);
        // graphics.draw_circle(Vector2::new(230.0, 345.0), 10.0, Color::GREEN);
    };
    if right_stop == false {
        graphics.draw_circle(Vector2::new(370.0, 255.0), 10.0, Color::GREEN);
    } else {
        graphics.draw_circle(Vector2::new(345.0, 255.0), 10.0, Color::RED);
        // graphics.draw_circle(Vector2::new(370.0, 255.0), 10.0, Color::GREEN);
    };
}
