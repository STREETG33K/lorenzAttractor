import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";

import boidsImage from "./boids.png"; // Use the correct path for boids.png
import ballsImage from "./balls.png"; // Use the correct path for boids.png

function App() {
    return (
        <div className="start-page">
            <header>
                <h1>Welcome to my Website</h1>
                <nav>
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/">About</a>
                        </li>
                        <li>
                            <a href="../../scripts/script.js">Projects</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Carousel autoPlay interval={10000} infiniteLoop>
                    <div>
                        <img src={boidsImage} alt="Boids Simulation" />
                        <p className="legend">Boids is an artificial life program, developed by Craig Reynolds in 1986, which simulates the flocking behaviour of birds. His paper on this topic was published in 1987 in the proceedings of the ACM SIGGRAPH conference.[1] The name "boid" corresponds to a shortened version of "bird-oid object", which refers to a bird-like object.</p>
                    </div>
                    <div>
                        <img src={ballsImage} alt="Balls Simulation" />
                        <p className="legend">these balls are pretty cool</p>
                    </div>
                    {/* Add more slides as needed */}
                </Carousel>
                <p>This is just the beginning of an awesome start page!</p>
            </main>
            <footer>
                <p>&copy; {new Date().getFullYear()} Nicolas Asmann</p>
            </footer>
        </div>
    );
}

export default App;
