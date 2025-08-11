type DynamicRoutes = {
	"/doctors/[id]": { id: string };
	"/patients/[id]": { id: string };
	"/treatments/[id]": { id: string }
};

type Layouts = {
	"/": { id?: string };
	"/appointments": undefined;
	"/doctors": { id?: string };
	"/doctors/[id]": { id: string };
	"/login": undefined;
	"/messages": undefined;
	"/patients": { id?: string };
	"/patients/[id]": { id: string };
	"/payments": undefined;
	"/reviews": undefined;
	"/signup": undefined;
	"/surgery-schedule": undefined;
	"/treatments": { id?: string };
	"/treatments/[id]": { id: string }
};

export type RouteId = "/" | "/appointments" | "/doctors" | "/doctors/[id]" | "/login" | "/messages" | "/patients" | "/patients/[id]" | "/payments" | "/reviews" | "/signup" | "/surgery-schedule" | "/treatments" | "/treatments/[id]";

export type RouteParams<T extends RouteId> = T extends keyof DynamicRoutes ? DynamicRoutes[T] : Record<string, never>;

export type LayoutParams<T extends RouteId> = Layouts[T] | Record<string, never>;

export type Pathname = "/" | "/appointments" | "/doctors" | `/doctors/${string}` & {} | "/login" | "/messages" | "/patients" | `/patients/${string}` & {} | "/payments" | "/reviews" | "/signup" | "/surgery-schedule" | "/treatments" | `/treatments/${string}` & {};

export type ResolvedPathname = `${"" | `/${string}`}${Pathname}`;

export type Asset = "/favicon.svg" | "/loginImage.jpeg" | "/medSynk-logo.png" | "/signupImage.jpg" | "/treatmentImage1.png" | "/treatmentImage2.png" | "/treatmentImage3.png" | "/treatmentImage4.png" | "/treatmentImage5.png" | "/treatmentImage6.png" | "/treatmentImage7.png" | "/treatmentImage8.png" | "/treatmentImage9.png" | "/underconstruction.gif";