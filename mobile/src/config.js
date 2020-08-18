export default process.env.NODE_ENV === "production"
	? {
			apiURL: "",
			openURL: "https://www.nova88.net",
			imgUrl: "",
			t_and_cURL: ""
	  }
	: {
			apiURL: "http://www.n88dev.com",
			imgUrl: "http://www.n88dev.com",
			t_and_cURL: "http://www.n88dev.com",
			openURL: "http://www.n88dev.com"
	  };
