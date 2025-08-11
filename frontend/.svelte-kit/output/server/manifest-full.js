export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","loginImage.jpeg","medSynk-logo.png","signupImage.jpg","treatmentImage1.png","treatmentImage2.png","treatmentImage3.png","treatmentImage4.png","treatmentImage5.png","treatmentImage6.png","treatmentImage7.png","treatmentImage8.png","treatmentImage9.png","underconstruction.gif"]),
	mimeTypes: {".svg":"image/svg+xml",".jpeg":"image/jpeg",".png":"image/png",".jpg":"image/jpeg",".gif":"image/gif"},
	_: {
		client: {start:"_app/immutable/entry/start.DsRO7jeS.js",app:"_app/immutable/entry/app.nDD0u9dQ.js",imports:["_app/immutable/entry/start.DsRO7jeS.js","_app/immutable/chunks/D6ncJ84j.js","_app/immutable/chunks/Dv6zZy1x.js","_app/immutable/chunks/Dj2oFZq9.js","_app/immutable/chunks/DmndFaT7.js","_app/immutable/entry/app.nDD0u9dQ.js","_app/immutable/chunks/Dj2oFZq9.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dv6zZy1x.js","_app/immutable/chunks/BOZIkpl_.js","_app/immutable/chunks/DGToRU2A.js","_app/immutable/chunks/ClRDzuQ-.js","_app/immutable/chunks/DmndFaT7.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/appointments",
				pattern: /^\/appointments\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/doctors",
				pattern: /^\/doctors\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/doctors/[id]",
				pattern: /^\/doctors\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/messages",
				pattern: /^\/messages\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/patients",
				pattern: /^\/patients\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/patients/[id]",
				pattern: /^\/patients\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/payments",
				pattern: /^\/payments\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/reviews",
				pattern: /^\/reviews\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/signup",
				pattern: /^\/signup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/surgery-schedule",
				pattern: /^\/surgery-schedule\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/treatments",
				pattern: /^\/treatments\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/treatments/[id]",
				pattern: /^\/treatments\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
