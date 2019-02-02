# Advertisement Request Enhancer

A data-processing pipeline that augments an incoming Ad request with relevant contextual information.
Created a Node Restful API that can be running on localhost.

# Installation

* npm install
* create a file in './service' folder called 'geoIp2Auth.json', the json format would be 
```json
{
	"user" : "Your GeoIp2 username",
	"token": "Your GeoIp2 token"
}
```

# Running the software

* ```npm run start``` for simple setups.
* call the api "POST" http://localhost:4444/ with body as such
```json
{
	"site": {
		"id": "foo123",
		"page": "http://www.foo.com/why-foo"
	},
	"device": {
		"ip": "1.250.196.118"
	},
	"user": {
		"id": "9cb89r"
	}
}
```

# Features

* Latency < 500ms.
* Provided automated tests to demonstrate the correctness of the implementation.
* If request originates from an IP address outside of the United States, then abort the
transaction before calling any internal web services and respond with an error message.

# To Do Lists
* How fast can you make the end to end execution? Demonstrate the latency of your
application.
* Ensure that the application can handle an average of 50 requests per second over an
extended period of time.
* If the Publisher ID cannot be obtained, then abort the transaction.
* Allow individual processing units to easily be installed / uninstalled at runtime.
* Provide ways to monitor the health and performance of the application at runtime.
* Ensure that the application is fault-tolerant. That is, the end-to-end processing of an
incoming request should be able to proceed despite the failure of a non-required service.
