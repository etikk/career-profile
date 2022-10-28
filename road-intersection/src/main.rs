#![allow(non_snake_case)]
#![windows_subsystem = "windows"]
mod car;
// use crate::car::Direction::*;
use crate::car::CarType::*;
use car::Car;
use car::StartPos;

mod road;

use futures::executor::block_on;
use rand::Rng;
use road::draw_road;
use settimeout::set_timeout;
use std::process::exit;
use std::time::Duration;

use speedy2d::color::Color;
use speedy2d::window::{KeyScancode, VirtualKeyCode, WindowHandler, WindowHelper};
use speedy2d::{Graphics2D, Window};

fn main() {
    // logs speedy2d info to terminal
    simple_logger::SimpleLogger::new().init().unwrap();

    // creates new window as canvas with given size
    let window = Window::new_centered("Road Intersection", (600, 600)).unwrap();
    let top_vec: Vec<Car> = Vec::new();
    let bottom_vec: Vec<Car> = Vec::new();
    let left_vec: Vec<Car> = Vec::new();
    let right_vec: Vec<Car> = Vec::new();
    let left_count = 0;
    let right_count = 0;
    let up_count = 0;
    let down_count = 0;
    let frame_count = 0;
    let reset_block_count = 0;
    let random_count = -1;
    let left_spam = false;
    let right_spam = false;
    let up_spam = false;
    let down_spam = false;
    let left_stop = true;
    let right_stop = true;
    let up_stop = true;
    let down_stop = true;

    // main loop for canvas; arguments are passed to window.self
    window.run_loop(MyWindowHandler {
        top_vec,
        bottom_vec,
        left_vec,
        right_vec,
        left_count,
        right_count,
        up_count,
        down_count,
        frame_count,
        reset_block_count,
        random_count,
        left_spam,
        right_spam,
        up_spam,
        down_spam,
        left_stop,
        right_stop,
        up_stop,
        down_stop,
    });
}

// window handler struct; sets self.* fields
pub struct MyWindowHandler {
    top_vec: Vec<Car>,
    bottom_vec: Vec<Car>,
    left_vec: Vec<Car>,
    right_vec: Vec<Car>,
    left_count: i32,
    right_count: i32,
    up_count: i32,
    down_count: i32,
    frame_count: i32,
    reset_block_count: i32,
    random_count: i32,
    left_spam: bool,
    right_spam: bool,
    up_spam: bool,
    down_spam: bool,
    left_stop: bool,
    right_stop: bool,
    up_stop: bool,
    down_stop: bool,
}

// these functions are run in an endless loop in the canvas window
impl WindowHandler for MyWindowHandler {
    // changes what is drawn onto canvas with each loop (frame)
    fn on_draw(&mut self, helper: &mut WindowHelper, graphics: &mut Graphics2D) {
        // clears canvas between frames
        graphics.clear_screen(Color::WHITE);

        // self.frame_count += 1;

        // draws road background
        draw_road(
            graphics,
            self.left_stop,
            self.right_stop,
            self.up_stop,
            self.down_stop,
        );

        // draws cars
        let temp_top_vec = self.top_vec.clone();
        let temp_bottom_vec = self.bottom_vec.clone();
        let temp_left_vec = self.left_vec.clone();
        let temp_right_vec = self.right_vec.clone();

        if self.reset_block_count == 0 {
            self.down_stop = true;
            self.up_stop = true;
            self.left_stop = true;
            self.right_stop = true;
        }

        let mut waiting_top: Vec<Car> = Vec::new();
        let mut waiting_bottom: Vec<Car> = Vec::new();
        let mut waiting_left: Vec<Car> = Vec::new();
        let mut waiting_right: Vec<Car> = Vec::new();

        for car in self.top_vec.clone() {
            if car.traveled <= 265.0 {
                waiting_top.push(car);
            }
        }
        for car in self.bottom_vec.clone() {
            if car.traveled <= 265.0 {
                waiting_bottom.push(car);
            }
        }
        for car in self.left_vec.clone() {
            if car.traveled <= 265.0 {
                waiting_left.push(car);
            }
        }
        for car in self.right_vec.clone() {
            if car.traveled <= 265.0 {
                waiting_right.push(car);
            }
        }

        if ((waiting_top.len() > 0 && waiting_top[0].traveled == 265.0)
            || (waiting_bottom.len() > 0 && waiting_bottom[0].traveled == 265.0)
            || (waiting_left.len() > 0 && waiting_left[0].traveled == 265.0)
            || (waiting_right.len() > 0 && waiting_right[0].traveled == 265.0))
            && self.frame_count < 1
        {
            println!("Evaluating traffic...{}", self.frame_count);

            let mut longest: &str = "top";
            if waiting_bottom.len() > waiting_top.len() {
                longest = "bottom";
            } else if waiting_left.len() > waiting_top.len() {
                longest = "left";
            } else if waiting_right.len() > waiting_top.len() {
                longest = "right";
            }

            match longest {
                "top" => {
                    if (waiting_bottom.len() > 0
                        && waiting_left.len() > 0
                        && waiting_right.len() > 0)
                        && (waiting_top[0].turn == Righty
                            && waiting_bottom[0].turn == Righty
                            && waiting_left[0].turn == Righty
                            && waiting_right[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.up_stop = false;
                        self.left_stop = false;
                        self.right_stop = false;
                        self.frame_count = 40;
                    } else if (waiting_bottom.len() > 0 && waiting_left.len() > 0)
                        && (waiting_top[0].turn == Righty
                            && waiting_bottom[0].turn == Righty
                            && waiting_left[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.up_stop = false;
                        self.left_stop = false;
                        self.frame_count = 40;
                    } else if (waiting_bottom.len() > 0 && waiting_right.len() > 0)
                        && (waiting_top[0].turn == Righty
                            && waiting_bottom[0].turn == Righty
                            && waiting_right[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.up_stop = false;
                        self.right_stop = false;
                        self.frame_count = 40;
                    } else if waiting_bottom.len() > 0
                        && (waiting_top[0].turn == Righty && waiting_bottom[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.up_stop = false;
                        self.frame_count = 40;
                    } else if waiting_left.len() > 0
                        && (waiting_top[0].turn == Righty && waiting_left[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.left_stop = false;
                        self.frame_count = 40;
                    } else if waiting_right.len() > 0
                        && (waiting_top[0].turn == Righty && waiting_right[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.right_stop = false;
                        self.frame_count = 40;
                    } else if waiting_bottom.len() > 0
                        && (waiting_top[0].turn == Righty && waiting_bottom[0].turn == Straighty
                            || waiting_top[0].turn == Straighty && waiting_bottom[0].turn == Righty
                            || waiting_top[0].turn == Straighty
                                && waiting_bottom[0].turn == Straighty)
                    {
                        self.down_stop = false;
                        self.up_stop = false;
                        self.frame_count = 60;
                    } else if waiting_bottom.len() > 0
                        && (waiting_top[0].turn == Lefty && waiting_bottom[0].turn == Lefty)
                    {
                        self.down_stop = false;
                        self.up_stop = false;
                        self.frame_count = 80;
                    } else if waiting_bottom.len() > 0
                        && (waiting_top[0].turn == Lefty && waiting_bottom[0].turn != Lefty)
                    {
                        self.down_stop = false;
                        self.frame_count = 80;
                    } else if waiting_right.len() > 0
                        && (waiting_top[0].turn == Lefty && waiting_right[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.right_stop = false;
                        self.frame_count = 80;
                    } else if waiting_top[0].turn == Straighty {
                        self.down_stop = false;
                        self.frame_count = 60;
                    } else if waiting_top[0].turn == Righty {
                        self.down_stop = false;
                        self.frame_count = 40;
                    } else if waiting_top[0].turn == Lefty {
                        self.down_stop = false;
                        self.frame_count = 80;
                    }
                }
                "bottom" => {
                    if (waiting_top.len() > 0 && waiting_left.len() > 0 && waiting_right.len() > 0)
                        && (waiting_bottom[0].turn == Righty
                            && waiting_top[0].turn == Righty
                            && waiting_left[0].turn == Righty
                            && waiting_right[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.up_stop = false;
                        self.left_stop = false;
                        self.right_stop = false;
                        self.frame_count = 40;
                    } else if (waiting_top.len() > 0 && waiting_left.len() > 0)
                        && (waiting_top[0].turn == Righty
                            && waiting_bottom[0].turn == Righty
                            && waiting_left[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.up_stop = false;
                        self.left_stop = false;
                        self.frame_count = 40;
                    } else if (waiting_top.len() > 0 && waiting_right.len() > 0)
                        && (waiting_top[0].turn == Righty
                            && waiting_bottom[0].turn == Righty
                            && waiting_right[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.up_stop = false;
                        self.right_stop = false;
                        self.frame_count = 40;
                    } else if waiting_top.len() > 0
                        && (waiting_top[0].turn == Righty && waiting_bottom[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.up_stop = false;
                        self.frame_count = 40;
                    } else if waiting_left.len() > 0
                        && (waiting_bottom[0].turn == Righty && waiting_left[0].turn == Righty)
                    {
                        self.up_stop = false;
                        self.left_stop = false;
                        self.frame_count = 40;
                    } else if waiting_right.len() > 0
                        && (waiting_bottom[0].turn == Righty && waiting_right[0].turn == Righty)
                    {
                        self.up_stop = false;
                        self.right_stop = false;
                        self.frame_count = 40;
                    // if waiting_top.len() > 0
                    //     && (waiting_bottom[0].turn == Righty && waiting_top[0].turn == Righty)
                    // {
                    //     self.down_stop = false;
                    //     self.up_stop = false;
                    //     self.frame_count = 40;
                    } else if waiting_top.len() > 0
                        && (waiting_bottom[0].turn == Righty && waiting_top[0].turn == Straighty)
                        || waiting_top.len() > 0
                            && (waiting_bottom[0].turn == Straighty
                                && waiting_top[0].turn == Righty)
                        || waiting_top.len() > 0
                            && (waiting_bottom[0].turn == Straighty
                                && waiting_top[0].turn == Straighty)
                    {
                        self.down_stop = false;
                        self.up_stop = false;
                        self.frame_count = 60;
                    } else if waiting_top.len() > 0
                        && (waiting_bottom[0].turn == Lefty && waiting_top[0].turn == Lefty)
                    {
                        self.down_stop = false;
                        self.up_stop = false;
                        self.frame_count = 80;
                    } else if waiting_top.len() > 0
                        && (waiting_bottom[0].turn == Lefty && waiting_top[0].turn != Lefty)
                    {
                        self.up_stop = false;
                        self.frame_count = 80;
                    } else if waiting_left.len() > 0
                        && (waiting_bottom[0].turn == Lefty && waiting_left[0].turn == Righty)
                    {
                        self.up_stop = false;
                        self.left_stop = false;
                        self.frame_count = 80;
                    } else if waiting_bottom[0].turn == Straighty {
                        self.up_stop = false;
                        self.frame_count = 60;
                    } else if waiting_bottom[0].turn == Righty {
                        self.up_stop = false;
                        self.frame_count = 40;
                    } else if waiting_bottom[0].turn == Lefty {
                        self.up_stop = false;
                        self.frame_count = 80;
                    }
                }
                "left" => {
                    if (waiting_bottom.len() > 0
                        && waiting_top.len() > 0
                        && waiting_right.len() > 0)
                        && (waiting_top[0].turn == Righty
                            && waiting_bottom[0].turn == Righty
                            && waiting_left[0].turn == Righty
                            && waiting_right[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.up_stop = false;
                        self.left_stop = false;
                        self.right_stop = false;
                        self.frame_count = 40;
                    } else if (waiting_bottom.len() > 0 && waiting_top.len() > 0)
                        && (waiting_top[0].turn == Righty
                            && waiting_bottom[0].turn == Righty
                            && waiting_left[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.up_stop = false;
                        self.left_stop = false;
                        self.frame_count = 40;
                    } else if (waiting_bottom.len() > 0 && waiting_right.len() > 0)
                        && (waiting_left[0].turn == Righty
                            && waiting_bottom[0].turn == Righty
                            && waiting_right[0].turn == Righty)
                    {
                        self.left_stop = false;
                        self.up_stop = false;
                        self.right_stop = false;
                        self.frame_count = 40;
                    } else if waiting_right.len() > 0
                        && (waiting_left[0].turn == Righty && waiting_right[0].turn == Righty)
                    {
                        self.left_stop = false;
                        self.right_stop = false;
                        self.frame_count = 40;
                    } else if waiting_top.len() > 0
                        && (waiting_top[0].turn == Righty && waiting_left[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.left_stop = false;
                        self.frame_count = 40;
                    } else if waiting_bottom.len() > 0
                        && (waiting_bottom[0].turn == Righty && waiting_left[0].turn == Righty)
                    {
                        self.up_stop = false;
                        self.left_stop = false;
                        self.frame_count = 40;
                    // if waiting_right.len() > 0
                    //     && (waiting_left[0].turn == Righty && waiting_right[0].turn == Righty)
                    // {
                    //     self.left_stop = false;
                    //     self.right_stop = false;
                    //     self.frame_count = 40;
                    } else if waiting_right.len() > 0
                        && (waiting_left[0].turn == Righty && waiting_right[0].turn == Straighty)
                        || waiting_right.len() > 0
                            && (waiting_left[0].turn == Straighty
                                && waiting_right[0].turn == Righty)
                        || waiting_right.len() > 0
                            && (waiting_left[0].turn == Straighty
                                && waiting_right[0].turn == Straighty)
                    {
                        self.left_stop = false;
                        self.right_stop = false;
                        self.frame_count = 60;
                    } else if waiting_right.len() > 0
                        && (waiting_left[0].turn == Lefty && waiting_right[0].turn == Lefty)
                    {
                        self.left_stop = false;
                        self.right_stop = false;
                        self.frame_count = 80;
                    } else if waiting_right.len() > 0
                        && (waiting_left[0].turn == Lefty && waiting_right[0].turn != Lefty)
                    {
                        self.left_stop = false;
                        self.frame_count = 80;
                    } else if waiting_top.len() > 0
                        && (waiting_left[0].turn == Lefty && waiting_top[0].turn == Righty)
                    {
                        self.left_stop = false;
                        self.down_stop = false;
                        self.frame_count = 80;
                    } else if waiting_left[0].turn == Straighty {
                        self.left_stop = false;
                        self.frame_count = 60;
                    } else if waiting_left[0].turn == Righty {
                        self.left_stop = false;
                        self.frame_count = 40;
                    } else if waiting_left[0].turn == Lefty {
                        self.left_stop = false;
                        self.frame_count = 80;
                    }
                }
                "right" => {
                    if (waiting_bottom.len() > 0 && waiting_left.len() > 0 && waiting_top.len() > 0)
                        && (waiting_top[0].turn == Righty
                            && waiting_bottom[0].turn == Righty
                            && waiting_left[0].turn == Righty
                            && waiting_right[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.up_stop = false;
                        self.left_stop = false;
                        self.right_stop = false;
                        self.frame_count = 40;
                    } else if (waiting_bottom.len() > 0 && waiting_left.len() > 0)
                        && (waiting_right[0].turn == Righty
                            && waiting_bottom[0].turn == Righty
                            && waiting_left[0].turn == Righty)
                    {
                        self.right_stop = false;
                        self.up_stop = false;
                        self.left_stop = false;
                        self.frame_count = 40;
                    } else if (waiting_bottom.len() > 0 && waiting_top.len() > 0)
                        && (waiting_top[0].turn == Righty
                            && waiting_bottom[0].turn == Righty
                            && waiting_right[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.up_stop = false;
                        self.right_stop = false;
                        self.frame_count = 40;
                    } else if waiting_left.len() > 0
                        && (waiting_left[0].turn == Righty && waiting_right[0].turn == Righty)
                    {
                        self.left_stop = false;
                        self.right_stop = false;
                        self.frame_count = 40;
                    } else if waiting_bottom.len() > 0
                        && (waiting_bottom[0].turn == Righty && waiting_right[0].turn == Righty)
                    {
                        self.up_stop = false;
                        self.right_stop = false;
                        self.frame_count = 40;
                    } else if waiting_top.len() > 0
                        && (waiting_top[0].turn == Righty && waiting_right[0].turn == Righty)
                    {
                        self.down_stop = false;
                        self.right_stop = false;
                        self.frame_count = 40;
                    // if waiting_left.len() > 0
                    //     && (waiting_right[0].turn == Righty && waiting_left[0].turn == Righty)
                    // {
                    //     self.left_stop = false;
                    //     self.right_stop = false;
                    //     self.frame_count = 40;
                    } else if waiting_left.len() > 0
                        && (waiting_right[0].turn == Righty && waiting_left[0].turn == Straighty)
                        || waiting_left.len() > 0
                            && (waiting_right[0].turn == Straighty
                                && waiting_left[0].turn == Righty)
                        || waiting_left.len() > 0
                            && (waiting_right[0].turn == Straighty
                                && waiting_left[0].turn == Straighty)
                    {
                        self.left_stop = false;
                        self.right_stop = false;
                        self.frame_count = 60;
                    } else if waiting_left.len() > 0
                        && (waiting_right[0].turn == Lefty && waiting_left[0].turn == Lefty)
                    {
                        self.left_stop = false;
                        self.right_stop = false;
                        self.frame_count = 80;
                    } else if waiting_left.len() > 0
                        && (waiting_right[0].turn == Lefty && waiting_left[0].turn != Lefty)
                    {
                        self.right_stop = false;
                        self.frame_count = 80;
                    } else if waiting_bottom.len() > 0
                        && (waiting_right[0].turn == Lefty && waiting_bottom[0].turn != Righty)
                    {
                        self.right_stop = false;
                        self.up_stop = false;
                        self.frame_count = 80;
                    } else if waiting_right[0].turn == Straighty {
                        self.right_stop = false;
                        self.frame_count = 60;
                    } else if waiting_right[0].turn == Righty {
                        self.right_stop = false;
                        self.frame_count = 40;
                    } else if waiting_right[0].turn == Lefty {
                        self.right_stop = false;
                        self.frame_count = 80;
                    }
                }
                _ => {}
            }
            self.reset_block_count = 15;
        } else {
            self.frame_count -= 1;
            self.reset_block_count -= 1;
            println!("frame count: {}", self.frame_count);
            println!("reset block count: {}", self.reset_block_count);
        }

        for (i, car) in self.top_vec[..].iter_mut().enumerate() {
            if car.traveled == 265.0 && self.down_stop {
                car.current_speed = 0.0;
            }
            if temp_top_vec.len() > 1 {
                if i > 0 {
                    if car.traveled == 265.0 && self.down_stop {
                        car.current_speed = 0.0;
                    } else if temp_top_vec[i - 1].traveled - car.traveled < 30.0 {
                        car.current_speed = 0.0;
                    } else if temp_top_vec[i - 1].traveled - car.traveled >= 40.0 {
                        car.current_speed = car.const_speed;
                    }
                }
            }
            if car.current_speed == 0.0 && car.traveled == 265.0 && !self.down_stop {
                car.current_speed = car.const_speed;
            }

            car.drive(graphics);
        }

        for (i, car) in self.bottom_vec[..].iter_mut().enumerate() {
            if car.traveled == 265.0 && self.up_stop {
                car.current_speed = 0.0;
            }
            if temp_bottom_vec.len() > 1 {
                if i > 0 {
                    if car.traveled == 265.0 && self.up_stop {
                        car.current_speed = 0.0;
                    } else if temp_bottom_vec[i - 1].traveled - car.traveled < 30.0 {
                        car.current_speed = 0.0;
                    } else if temp_bottom_vec[i - 1].traveled - car.traveled >= 40.0 {
                        car.current_speed = car.const_speed;
                    }
                }
            }
            if car.current_speed == 0.0 && car.traveled == 265.0 && !self.up_stop {
                car.current_speed = car.const_speed;
            }

            car.drive(graphics);
        }

        for (i, car) in self.left_vec[..].iter_mut().enumerate() {
            if car.traveled == 265.0 && self.left_stop {
                car.current_speed = 0.0;
            }
            if temp_left_vec.len() > 1 {
                if i > 0 {
                    if car.traveled == 265.0 && self.left_stop {
                        car.current_speed = 0.0;
                    } else if temp_left_vec[i - 1].traveled - car.traveled < 30.0 {
                        car.current_speed = 0.0;
                    } else if temp_left_vec[i - 1].traveled - car.traveled >= 40.0 {
                        car.current_speed = car.const_speed;
                    }
                }
            }
            if car.current_speed == 0.0 && car.traveled == 265.0 && !self.left_stop {
                car.current_speed = car.const_speed;
            }

            car.drive(graphics);
        }

        for (i, car) in self.right_vec[..].iter_mut().enumerate() {
            if car.traveled == 265.0 && self.right_stop {
                car.current_speed = 0.0;
            }
            if temp_right_vec.len() > 1 {
                if i > 0 {
                    if car.traveled == 265.0 && self.right_stop {
                        car.current_speed = 0.0;
                    } else if temp_right_vec[i - 1].traveled - car.traveled < 30.0 {
                        car.current_speed = 0.0;
                    } else if temp_right_vec[i - 1].traveled - car.traveled >= 40.0 {
                        car.current_speed = car.const_speed;
                    }
                }
            }
            if car.current_speed == 0.0 && car.traveled == 265.0 && !self.right_stop {
                car.current_speed = car.const_speed;
            }

            car.drive(graphics);
        }

        // remove from car_vec if car has reached end of road
        self.top_vec.retain(|car| {
            if car.position.0 > 600.0
                || car.position.0 < 0.0
                || car.position.1 > 600.0
                || car.position.1 < 0.0
            {
                false
            } else {
                true
            }
        });
        self.bottom_vec.retain(|car| {
            if car.position.0 > 600.0
                || car.position.0 < 0.0
                || car.position.1 > 600.0
                || car.position.1 < 0.0
            {
                false
            } else {
                true
            }
        });
        self.left_vec.retain(|car| {
            if car.position.0 > 600.0
                || car.position.0 < 0.0
                || car.position.1 > 600.0
                || car.position.1 < 0.0
            {
                false
            } else {
                true
            }
        });
        self.right_vec.retain(|car| {
            if car.position.0 > 600.0
                || car.position.0 < 0.0
                || car.position.1 > 600.0
                || car.position.1 < 0.0
            {
                false
            } else {
                true
            }
        });

        if self.down_spam {
            self.down_count += 1;
            if self.down_count > 60 {
                self.down_spam = false;
                self.down_count = 0;
            }
        }
        if self.up_spam {
            self.up_count += 1;
            if self.up_count > 60 {
                self.up_spam = false;
                self.up_count = 0;
            }
        }
        if self.left_spam {
            self.left_count += 1;
            if self.left_count > 60 {
                self.left_spam = false;
                self.left_count = 0;
            }
        }
        if self.right_spam {
            self.right_count += 1;
            if self.right_count > 60 {
                self.right_spam = false;
                self.right_count = 0;
            }
        }
        // println!("car_vec length: {}", self.car_vec.len());

        // spawns random cars from random directions
        if self.random_count >= 0 {
            self.random_count += 1;
            if self.random_count > 20 {
                self.random_count = 0;
                let mut rng = rand::thread_rng();
                let random_number: u32 = rng.gen_range(1..100);
                match random_number {
                    1..=25 => {
                        if !self.left_spam && self.left_vec.len() < 10 {
                            self.left_vec.push(Car::new(StartPos::Left, 1.0));
                            self.left_spam = true;
                        }
                    }
                    26..=50 => {
                        if !self.right_spam && self.right_vec.len() < 10 {
                            self.right_vec.push(Car::new(StartPos::Right, 1.0));
                            self.right_spam = true;
                        }
                    }
                    51..=75 => {
                        if !self.up_spam && self.top_vec.len() < 10 {
                            self.top_vec.push(Car::new(StartPos::Top, 1.0));
                            self.up_spam = true;
                        }
                    }
                    76..=100 => {
                        if !self.down_spam && self.bottom_vec.len() < 10 {
                            self.bottom_vec.push(Car::new(StartPos::Bottom, 1.0));
                            self.down_spam = true;
                        }
                    }
                    _ => {
                        println!("Error: random_number out of range");
                    }
                };
            }
        }

        // timer function to call new frame on canves after duration
        async fn foo(helper: &mut WindowHelper) {
            set_timeout(Duration::from_millis(10)).await;
            // this call new frame redraw (new loop)
            helper.request_redraw();
        }

        block_on(foo(helper));
    }

    // executes key down event
    fn on_key_down(
        &mut self,
        _helper: &mut WindowHelper,
        virtual_key_code: Option<VirtualKeyCode>,
        scancode: KeyScancode,
    ) {
        println!("Key down: {:?} ({})", virtual_key_code, scancode);
        // Space clears screen of all cars
        if virtual_key_code == Some(VirtualKeyCode::Space) {
            self.top_vec.clear();
            self.bottom_vec.clear();
            self.left_vec.clear();
            self.bottom_vec.clear();
        }
        // Backspace clears last car from car_vec
        // if virtual_key_code == Some(VirtualKeyCode::Backspace) {
        //     self.car_vec.pop();
        // }
        // Esc terminates window (Exits program)
        if virtual_key_code == Some(VirtualKeyCode::Escape) {
            // esc
            exit(0);
        }

        // 'r' spawns new car in random starting position
        if virtual_key_code == Some(VirtualKeyCode::R) {
            // r
            let mut rng = rand::thread_rng();
            let random_number: u32 = rng.gen_range(1..100);
            match random_number {
                1..=25 => {
                    if !self.left_spam && self.left_vec.len() < 10 {
                        self.left_vec.push(Car::new(StartPos::Left, 1.0));
                        self.left_spam = true;
                    }
                }
                26..=50 => {
                    if !self.right_spam && self.right_vec.len() < 10 {
                        self.right_vec.push(Car::new(StartPos::Right, 1.0));
                        self.right_spam = true;
                    }
                }
                51..=75 => {
                    if !self.up_spam && self.top_vec.len() < 10 {
                        self.top_vec.push(Car::new(StartPos::Top, 1.0));
                        self.up_spam = true;
                    }
                }
                76..=100 => {
                    if !self.down_spam && self.bottom_vec.len() < 10 {
                        self.bottom_vec.push(Car::new(StartPos::Bottom, 1.0));
                        self.down_spam = true;
                    }
                }
                _ => {
                    println!("Error: random_number out of range");
                }
            };
        }
        if virtual_key_code == Some(VirtualKeyCode::Left) {
            // left
            if !self.left_spam && self.left_vec.len() < 10 {
                self.left_vec.push(Car::new(StartPos::Left, 1.0));
                self.left_spam = true;
            }
        }
        if virtual_key_code == Some(VirtualKeyCode::Right) {
            // right
            if !self.right_spam && self.right_vec.len() < 10 {
                self.right_vec.push(Car::new(StartPos::Right, 1.0));
                self.right_spam = true;
            }
        }
        if virtual_key_code == Some(VirtualKeyCode::Up) {
            // up
            if !self.up_spam && self.top_vec.len() < 10 {
                self.top_vec.push(Car::new(StartPos::Top, 1.0));
                self.up_spam = true;
            }
        }
        if virtual_key_code == Some(VirtualKeyCode::Down) {
            // down
            if !self.down_spam && self.bottom_vec.len() < 10 {
                self.bottom_vec.push(Car::new(StartPos::Bottom, 1.0));
                self.down_spam = true;
            }
        }
        if scancode == 72 {
            // numpad 8 up
            self.down_stop = !self.down_stop;
        }
        if scancode == 75 {
            // numpad 4 left
            self.left_stop = !self.left_stop;
        }
        if scancode == 77 {
            // numpad 6 right
            self.right_stop = !self.right_stop;
        }
        if scancode == 80 {
            // numpad 2 down
            self.up_stop = !self.up_stop;
        }
        // if enter key
        if virtual_key_code == Some(VirtualKeyCode::Return) {
            // enter
            if self.random_count < 0 {
                self.random_count = 0;
            } else {
                self.random_count = -1;
            }
        }
    }
}
