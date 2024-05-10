import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {

	const [list, setList] = useState([]);

	const host = 'https://swapi.tech/api/';
	const people = 'people';

	const getPeople = async () => {
		const uri = `${host}${people}`;
		const options = {
		};
		const response = await fetch(uri, options)
		console.log(response);
		if (!response.ok) {

			console.log('Error ', response.status, response.statusText);
			return;
		};
		const data = await response.json()
		setList(data.results)
		console.log('data: ', data);

	};

	useEffect(() => {
		getPeople();
	}, [])
	return (

		<div className="container-fluid text-center mt-5 bg-black">
			<h1 className="bg-black text-danger text-start">Characters</h1>
			<div className="row justify-content-center">
				{list.map((person, index) => (
					<div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
						<div className="card bg-dark text-light space">
							<img src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`} className="card-img-top image-fluid" alt="..."></img>
							<div className="card-body">
								<h5 className="card-title fs-2">{person.name}</h5>							
								<div className="container d-flex justify-content-between">
									<Link to="/Card" className="btn btn-primary">Learn More</Link >
									<a href="#" className="btn btn-warning"><i className="fas fa-heart"></i></a>
								</div>
							</div>

						</div>
					</div>
				))}
			</div>
		</div>

	)

};


