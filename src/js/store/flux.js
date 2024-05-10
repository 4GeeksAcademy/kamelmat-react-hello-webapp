const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
		
			persons: {},
			planets: [],
			planet: '',
			currentPlanet: null,
		},

		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			getPlanets: async () => {
				const response = await fetch('https://swapi.dev/api/planets')

				console.log(response);
				if (!response.ok) {

					console.log('Error ');
					return;
				};
				const data = await response.json()
				console.log(data);
				setStore({planets: data});
			},
			settingPlanet: (planet) => {setStore({currentPlanet: planet })},
			
		}
	};
};

export default getState;
