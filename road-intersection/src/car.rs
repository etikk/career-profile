pub use rand::Rng;
pub use speedy2d::color::Color;
pub use speedy2d::dimen::Vector2;
pub use speedy2d::shape::Rectangle;
pub use speedy2d::Graphics2D;

#[derive(Clone, Ord, PartialOrd, Eq, PartialEq)]
pub enum StartPos {
    Top,
    Bottom,
    Left,
    Right,
}

#[derive(Clone, Ord, PartialOrd, Eq, PartialEq)]
pub enum Direction {
    Up,
    Down,
    Left,
    Right,
}

#[derive(Clone, Ord, PartialOrd, Eq, PartialEq)]
pub enum CarType {
    Righty,
    Lefty,
    Straighty,
}

// #[derive(Ord, PartialOrd, Eq, PartialEq)]
#[derive(Clone)]
pub struct Car {
    pub start_pos: StartPos,
    pub const_speed: f32,
    pub current_speed: f32,
    pub traveled: f32,
    pub turn: CarType,
    pub direction: Direction,
    pub position: (f32, f32),
    // pub corners: Vec<Vector2<f32>>,
    pub rectangle: Rectangle,
    // pub brake_zone: Rectangle,
    // pub size: (f32, f32),
}

impl Car {
    pub fn new(start_pos: StartPos, speed: f32) -> Self {
        let position = match start_pos {
            StartPos::Top => (290.0, 0.0),
            StartPos::Bottom => (310.0, 600.0),
            StartPos::Left => (0.0, 310.0),
            StartPos::Right => (600.0, 290.0),
        };
        let start_dir = match start_pos {
            StartPos::Top => Direction::Down,
            StartPos::Bottom => Direction::Up,
            StartPos::Left => Direction::Right,
            StartPos::Right => Direction::Left,
        };
        // create random number from 1 to 100
        let mut rng = rand::thread_rng();
        let random_number: u32 = rng.gen_range(1..100);
        let turn = match random_number {
            1..=33 => CarType::Straighty,
            34..=67 => CarType::Righty,
            68..=100 => CarType::Lefty,
            _ => CarType::Straighty,
        };
        // let brake_zone_start = match start_dir {
        //     Direction::Up => Rectangle::new(
        //         Vector2::new(position.0 - 10.0, position.1 - 21.0),
        //         Vector2::new(position.0 + 10.0, position.1 - 10.0),
        //     ),
        //     Direction::Down => Rectangle::new(
        //         Vector2::new(position.0 - 10.0, position.1 + 10.0),
        //         Vector2::new(position.0 + 10.0, position.1 + 21.0),
        //     ),
        //     Direction::Left => Rectangle::new(
        //         Vector2::new(position.0 - 21.0, position.1 - 10.0),
        //         Vector2::new(position.0 - 10.0, position.1 + 10.0),
        //     ),
        //     Direction::Right => Rectangle::new(
        //         Vector2::new(position.0 + 10.0, position.1 - 10.0),
        //         Vector2::new(position.0 + 21.0, position.1 + 10.0),
        //     ),
        // };
        // let start_corners = vec![
        //     Vector2::new(position.0 - 10.0, position.1 - 10.0),
        //     Vector2::new(position.0 + 10.0, position.1 - 10.0),
        //     Vector2::new(position.0 + 10.0, position.1 + 10.0),
        //     Vector2::new(position.0 - 10.0, position.1 + 10.0),
        // ];

        Self {
            start_pos,
            const_speed: speed,
            current_speed: speed,
            traveled: 0.0,
            turn,
            direction: start_dir,
            position,
            // corners: start_corners,
            rectangle: Rectangle::new(
                Vector2::new(position.0 - 10.0, position.1 + 10.0),
                Vector2::new(position.0 + 10.0, position.1 - 10.0),
            ),
            // brake_zone: brake_zone_start,
            // size: (20.0, 20.0), // hardcoded for now
        }
    }

    pub fn draw(&self, graphics: &mut Graphics2D) {
        graphics.draw_rectangle(
            self.rectangle.clone(),
            match self.turn {
                CarType::Righty => Color::BLUE,
                CarType::Lefty => Color::YELLOW,
                CarType::Straighty => Color::MAGENTA,
            },
        );
        // graphics.draw_rectangle(self.brake_zone.clone(), Color::LIGHT_GRAY);
    }

    pub fn drive(&mut self, graphics: &mut Graphics2D/* , car_vec: &Vec<Car> */) {
        match self.direction {
            Direction::Up => {
                self.position.1 -= self.current_speed;
                self.traveled += self.current_speed;
                self.rectangle = Rectangle::new(
                    Vector2::new(self.position.0 - 10.0, self.position.1 + 10.0),
                    Vector2::new(self.position.0 + 10.0, self.position.1 - 10.0),
                );
                // self.brake_zone = Rectangle::new(
                //     Vector2::new(self.position.0 - 10.0, self.position.1 - 21.0),
                //     Vector2::new(self.position.0 + 10.0, self.position.1 - 10.0),
                // );
                if self.turn == CarType::Righty && self.traveled == 290.0 {
                    self.direction = Direction::Right;
                    // self.position.1 -= 1.0;
                    // self.traveled = -1000.0;
                } else if self.turn == CarType::Lefty && self.traveled == 310.0 {
                    // self.position.1 -= 1.0;
                    self.direction = Direction::Left;
                    // self.traveled = -1000.0;
                }
                self.draw(graphics);
            }
            Direction::Down => {
                self.position.1 += self.current_speed;
                self.traveled += self.current_speed;
                self.rectangle = Rectangle::new(
                    Vector2::new(self.position.0 - 10.0, self.position.1 + 10.0),
                    Vector2::new(self.position.0 + 10.0, self.position.1 - 10.0),
                );
                // self.brake_zone = Rectangle::new(
                //     Vector2::new(self.position.0 - 10.0, self.position.1 + 10.0),
                //     Vector2::new(self.position.0 + 10.0, self.position.1 + 21.0),
                // );
                if self.turn == CarType::Righty && self.traveled == 290.0 {
                    self.direction = Direction::Left;
                    // self.position.1 += 1.0;
                    // self.traveled = -1000.0;
                } else if self.turn == CarType::Lefty && self.traveled == 310.0 {
                    // self.position.1 += 1.0;
                    self.direction = Direction::Right;
                    // self.traveled = -1000.0;
                }
                self.draw(graphics);
            }
            Direction::Left => {
                self.position.0 -= self.current_speed;
                self.traveled += self.current_speed;
                self.rectangle = Rectangle::new(
                    Vector2::new(self.position.0 - 10.0, self.position.1 + 10.0),
                    Vector2::new(self.position.0 + 10.0, self.position.1 - 10.0),
                );
                // self.brake_zone = Rectangle::new(
                //     Vector2::new(self.position.0 - 21.0, self.position.1 - 10.0),
                //     Vector2::new(self.position.0 - 10.0, self.position.1 + 10.0),
                // );
                if self.turn == CarType::Righty && self.traveled == 290.0 {
                    self.direction = Direction::Up;
                    // self.position.0 -= 1.0;
                    // self.traveled = -1000.0;
                } else if self.turn == CarType::Lefty && self.traveled == 310.0 {
                    // self.position.0 -= 1.0;
                    self.direction = Direction::Down;
                    // self.traveled = -1000.0;
                }
                self.draw(graphics);
            }
            Direction::Right => {
                self.position.0 += self.current_speed;
                self.traveled += self.current_speed;
                self.rectangle = Rectangle::new(
                    Vector2::new(self.position.0 - 10.0, self.position.1 + 10.0),
                    Vector2::new(self.position.0 + 10.0, self.position.1 - 10.0),
                );
                // self.brake_zone = Rectangle::new(
                //     Vector2::new(self.position.0 + 10.0, self.position.1 - 10.0),
                //     Vector2::new(self.position.0 + 21.0, self.position.1 + 10.0),
                // );
                if self.turn == CarType::Righty && self.traveled == 290.0 {
                    self.direction = Direction::Down;
                    // self.position.0 += 1.0;
                    // self.traveled = -1000.0;
                } else if self.turn == CarType::Lefty && self.traveled == 310.0 {
                    // self.position.0 += 1.0;
                    self.direction = Direction::Up;
                    // self.traveled = -1000.0;
                }
                self.draw(graphics);
            }
        }

        // self.corners = vec![
        //     Vector2::new(self.position.0 - 10.0, self.position.1 - 10.0),
        //     Vector2::new(self.position.0 + 10.0, self.position.1 - 10.0),
        //     Vector2::new(self.position.0 + 10.0, self.position.1 + 10.0),
        //     Vector2::new(self.position.0 - 10.0, self.position.1 + 10.0),
        // ];

        // let mut crash = false;

        // 'intersect: for car in car_vec {
        //     for c in &car.corners {
        //         if self.brake_zone.contains(*c) {
        //             self.current_speed = 0.0;
        //             crash = true;
        //             break 'intersect;
        //         }
        //     }
        // }
        // if self.traveled != 265.0 && crash == false {
        //     self.current_speed = self.const_speed;
        // }
    }
}

