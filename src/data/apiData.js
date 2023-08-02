const apiData = {
	"apis": [{
			"id": "1",
			"name": "WeatherApi",
			"endpoints": [{
				"id": "1.1",
				"name": "GetCurrentWeather",
				"tests": [{
						"testName": "Should_ReturnWeather_When_CityNameProvided",
						"request": {
							"path": "/data/2.5/weather",
							"method": "GET",
							"headers": {},
							"queryParams": {
								"q": "London",
								"appid": "API_KEY"
							}
						},
						"response": {
							"status": 200,
							"headers": {
								"Content-Type": "application/json"
							},
							"body": "{\"coord\":{\"lon\":-0.1257,\"lat\":51.5085},\"weather\":[{\"id\":804,\"main\":\"Clouds\",\"description\":\"overcast clouds\",\"icon\":\"04d\"}],\"main\":{\"temp\":12.48,\"feels_like\":11.52,\"temp_min\":11.33,\"temp_max\":13.51,\"pressure\":1005,\"humidity\":81},\"visibility\":10000,\"wind\":{\"speed\":4.63,\"deg\":240},\"clouds\":{\"all\":90},\"dt\":1622992236,\"sys\":{\"country\":\"GB\",\"sunrise\":1622949948,\"sunset\":1623007514},\"timezone\":3600,\"id\":2643743,\"name\":\"London\",\"cod\":200}"
						}
					},
					{
						"testName": "Should_CreateWeather_When_NewWeatherDataProvided",
						"request": {
							"path": "/data/2.5/weather",
							"method": "POST",
							"headers": {
								"Content-Type": "application/json"
							},
							"body": "{\"city\":\"NewCity\",\"weather\":{\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"},\"main\":{\"temp\":25.0,\"feels_like\":24.0,\"temp_min\":24.0,\"temp_max\":26.0,\"pressure\":1003,\"humidity\":60}}"
						},
						"response": {
							"status": 201,
							"headers": {
								"Content-Type": "application/json"
							},
							"body": "{\"id\":123456,\"cod\":201}"
						}
					},
					{
						"testName": "Should_UpdateWeather_When_ExistingWeatherDataProvided",
						"request": {
							"path": "/data/2.5/weather/123456",
							"method": "PUT",
							"headers": {
								"Content-Type": "application/json"
							},
							"body": "{\"weather\":{\"main\":\"Rain\",\"description\":\"light rain\",\"icon\":\"10d\"},\"main\":{\"temp\":22.0,\"feels_like\":21.0,\"temp_min\":21.0,\"temp_max\":23.0,\"pressure\":1002,\"humidity\":70}}"
						},
						"response": {
							"status": 200,
							"headers": {
								"Content-Type": "application/json"
							},
							"body": "{\"id\":123456,\"cod\":200}"
						}
					},
					{
						"testName": "Should_DeleteWeather_When_WeatherIdProvided",
						"request": {
							"path": "/data/2.5/weather/123456",
							"method": "DELETE",
							"headers": {},
							"body": ""
						},
						"response": {
							"status": 204,
							"headers": {},
							"body": ""
						}
					}
				]
			}]
		},
		{
			"id": "2",
			"name": "PokemonApi",
			"endpoints": [{
				"id": "2.1",
				"name": "GetPokemon",
				"tests": [{
						"testName": "Should_ReturnPokemon_When_ValidIdProvided",
						"request": {
							"path": "/api/v2/pokemon/1",
							"method": "GET",
							"headers": {},
							"body": ""
						},
						"response": {
							"status": 200,
							"headers": {
								"Content-Type": "application/json"
							},
							"body": "{\"id\":1,\"name\":\"bulbasaur\",\"base_experience\":64,\"height\":7,\"is_default\":true,\"order\":1,\"weight\":69,\"abilities\":[{\"ability\":{\"name\":\"overgrow\",\"url\":\"https://pokeapi.co/api/v2/ability/65/\"},\"is_hidden\":false,\"slot\":1}],\"forms\":[{\"name\":\"bulbasaur\",\"url\":\"https://pokeapi.co/api/v2/pokemon-form/1/\"}],\"game_indices\":[{\"game_index\":1,\"version\":{\"name\":\"white-2\",\"url\":\"https://pokeapi.co/api/v2/version/22/\"}}],\"held_items\":[],\"location_area_encounters\":\"https://pokeapi.co/api/v2/pokemon/1/encounters\",\"moves\":[{\"move\":{\"name\":\"razor-wind\",\"url\":\"https://pokeapi.co/api/v2/move/13/\"}}],\"species\":{\"name\":\"bulbasaur\",\"url\":\"https://pokeapi.co/api/v2/pokemon-species/1/\"},\"sprites\":{\"front_default\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png\"},\"stats\":[{\"base_stat\":45,\"effort\":0,\"stat\":{\"name\":\"speed\",\"url\":\"https://pokeapi.co/api/v2/stat/6/\"}}]}"
						}
					},
					{
						"testName": "Should_CreatePokemon_When_NewPokemonDataProvided",
						"request": {
							"path": "/api/v2/pokemon",
							"method": "POST",
							"headers": {
								"Content-Type": "application/json"
							},
							"body": "{\"name\":\"newpokemon\",\"base_experience\":100,\"height\":10,\"is_default\":false,\"order\":999,\"weight\":80,\"abilities\":[{\"ability\":{\"name\":\"newability\",\"url\":\"https://pokeapi.co/api/v2/ability/999/\"},\"is_hidden\":false,\"slot\":1}],\"forms\":[{\"name\":\"newpokemon\",\"url\":\"https://pokeapi.co/api/v2/pokemon-form/999/\"}],\"game_indices\":[{\"game_index\":999,\"version\":{\"name\":\"white-2\",\"url\":\"https://pokeapi.co/api/v2/version/22/\"}}],\"held_items\":[],\"location_area_encounters\":\"https://pokeapi.co/api/v2/pokemon/999/encounters\",\"moves\":[{\"move\":{\"name\":\"new-move\",\"url\":\"https://pokeapi.co/api/v2/move/999/\"}}],\"species\":{\"name\":\"newpokemon\",\"url\":\"https://pokeapi.co/api/v2/pokemon-species/999/\"},\"sprites\":{\"front_default\":\"https://example.com/sprites/pokemon/999.png\"},\"stats\":[{\"base_stat\": 60,\"effort\":0,\"stat\":{\"name\":\"speed\",\"url\":\"https://pokeapi.co/api/v2/stat/6/\"}}]}"
						}
					},
					{
						"testName": "Should_UpdatePokemon_When_ExistingPokemonDataProvided",
						"request": {
							"path": "/api/v2/pokemon/999",
							"method": "PUT",
							"headers": {
								"Content-Type": "application/json"
							},
							"body": "{\"name\":\"updatedpokemon\",\"base_experience\":120,\"height\":12,\"is_default\":false,\"order\":1000,\"weight\":90,\"abilities\":[{\"ability\":{\"name\":\"updatedability\",\"url\":\"https://pokeapi.co/api/v2/ability/1000/\"},\"is_hidden\":false,\"slot\":1}],\"forms\":[{\"name\":\"updatedpokemon\",\"url\":\"https://pokeapi.co/api/v2/pokemon-form/1000/\"}],\"game_indices\":[{\"game_index\":1000,\"version\":{\"name\":\"white-2\",\"url\":\"https://pokeapi.co/api/v2/version/22/\"}}],\"held_items\":[],\"location_area_encounters\":\"https://pokeapi.co/api/v2/pokemon/1000/encounters\",\"moves\":[{\"move\":{\"name\":\"updated-move\",\"url\":\"https://pokeapi.co/api/v2/move/1000/\"}}],\"species\":{\"name\":\"updatedpokemon\",\"url\":\"https://pokeapi.co/api/v2/pokemon-species/1000/\"},\"sprites\":{\"front_default\":\"https://example.com/sprites/pokemon/1000.png\"},\"stats\":[{\"base_stat\":70,\"effort\":0,\"stat\":{\"name\":\"speed\",\"url\":\"https://pokeapi.co/api/v2/stat/6/\"}}]}"
						},
						"response": {
							"status": 200,
							"headers": {
								"Content-Type": "application/json"
							},
							"body": "{\"id\":999,\"cod\":200}"
						}
					},
					{
						"testName": "Should_DeletePokemon_When_PokemonIdProvided",
						"request": {
							"path": "/api/v2/pokemon/999",
							"method": "DELETE",
							"headers": {},
							"body": ""
						},
						"response": {
							"status": 204,
							"headers": {},
							"body": ""
						}
					}
				]
			}]
		}
	]
};

export default apiData;