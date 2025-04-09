import React from 'react';

const Icon = ({ type, size, action }) => {
	switch (type) {
		case 'location':
			return (
				<svg version="1.0" width={size} height={size} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve" fill="#40afc2"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#40afc2" d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24 C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24 C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"></path> </g></svg>
			);

		case 'arrowr':
			return (
				<svg viewBox="0 0 24 24" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#40afc2"></path> </g></svg>

			);
		case 'search':
			return (
				<svg viewBox="0 0 24 24" width={size} cursor="pointer" height={size} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>);
		case 'plus':
			return (
				<svg fill="currentColor" width={size} cursor="pointer" height={size} viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z"></path> </g></svg>);
		case 'user':
			return (
				<svg viewBox="0 0 24 24" fill="none" width={size} cursor="pointer" height={size} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="9" r="3" stroke="currentColor" stroke-width="1.5"></circle> <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"></circle> <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>);
		case 'restart':
			return (
				<svg onClick={action} width={size} cursor="pointer" height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.364 8.05026L17.6569 7.34315C14.5327 4.21896 9.46734 4.21896 6.34315 7.34315C3.21895 10.4673 3.21895 15.5327 6.34315 18.6569C9.46734 21.7811 14.5327 21.7811 17.6569 18.6569C19.4737 16.84 20.234 14.3668 19.9377 12.0005M18.364 8.05026H14.1213M18.364 8.05026V3.80762" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
			);
		case 'menu':
			return (
				<svg viewBox="0 0 24 24" fill="none" onClick={action} width={size} cursor="pointer" height={size} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>);
		case 'close':
			return (
				<svg viewBox="0 0 24 24" onClick={action} width={size} cursor="pointer" height={size} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="currentColor"></path> </g></svg>);
		case 'save':
			return (
				<svg viewBox="0 0 1024 1024" onClick={action} width={size} cursor="pointer" height={size} class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M917.52 369.86L594.24 98.59l-98.62 117.52-181.15-67.54-124.33 290.24h-80.28V914h804.57V438.81h-54.78l57.87-68.95zM603.24 201.62l211.25 177.23-50.33 59.96H404.21l199.03-237.19z m-248.99 39.84l91.47 34.1-136.98 163.25h-39.01l84.52-197.35z m487.04 599.39H183.01v-328.9H841.3v328.9z" fill="currentColor"></path><path d="M621.68 640.96h146.29v73.14H621.68z" fill="currentColor"></path></g></svg>);
		case 'nature':
			return (
				<svg fill="currentColor" onClick={action} width={size} cursor="pointer" height={size} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M57.473,42.533c0-5.891-6.195-18.732-12.889-31.731c-0.48-0.937-0.902-1.752-1.242-2.422 c-2.582-5.089-5.769-5.849-7.44-5.849c-2.897,0-5.535,2.08-7.429,5.857c-0.3,0.598-0.668,1.323-1.089,2.151 C20.707,23.691,14.527,36.67,14.527,42.531c0,11.294,8.77,20.559,19.854,21.392v3.548c0,1.104,0.896,2,2,2c1.104,0,2-0.896,2-2 v-3.605C49.104,62.676,57.473,53.567,57.473,42.533z M37.381,59.936v-5.844l7.291-7.292c0.391-0.391,0.391-1.022,0-1.413 c-0.391-0.392-1.023-0.392-1.414,0l-5.877,5.877V31.841l5.604-5.604c0.391-0.391,0.391-1.023,0-1.414 c-0.392-0.391-1.023-0.391-1.414,0l-4.189,4.189v-2.543c0-0.553-0.447-1-1-1s-1,0.447-1,1v4.543l-0.061,0.061 c-0.391,0.391-0.391,1.023,0,1.414c0.018,0.018,0.042,0.024,0.061,0.041v10.72l-5.224-5.225c-0.391-0.392-1.023-0.392-1.414,0 c-0.391,0.391-0.391,1.022,0,1.414l6.55,6.551c0.026,0.026,0.06,0.036,0.088,0.059v7.217l-0.061,0.061 c-0.391,0.391-0.391,1.023,0,1.414c0.018,0.018,0.042,0.024,0.061,0.041v5.195c-9.348-0.329-16.855-8.016-16.855-17.441 c0-5.713,9.027-23.491,12.424-30.182c0.424-0.835,0.795-1.566,1.099-2.17c1.146-2.286,2.586-3.65,3.853-3.65 c1.284,0,2.694,1.333,3.874,3.659c0.343,0.675,0.768,1.5,1.252,2.443c3.724,7.231,12.445,24.166,12.445,29.9 C53.473,51.701,46.369,59.228,37.381,59.936z"></path> <path d="M36.381,21.469c-0.553,0-1,0.447-1,1v1c0,0.553,0.447,1,1,1s1-0.447,1-1v-1C37.381,21.916,36.934,21.469,36.381,21.469z"></path> <path d="M26.749,36.019c-0.19,0.19-0.3,0.45-0.3,0.709c0,0.271,0.11,0.53,0.29,0.711c0.19,0.189,0.45,0.289,0.71,0.289 c0.271,0,0.521-0.1,0.71-0.289c0.181-0.189,0.29-0.439,0.29-0.711c0-0.259-0.1-0.519-0.29-0.7 C27.789,35.659,27.109,35.659,26.749,36.019z"></path> </g> </g></svg>
			);
		case 'community':
			return (
				<svg fill="currentColor" onClick={action} width={size} cursor="pointer" height={size} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 240" enable-background="new 0 0 256 240" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M127.826,39.584c10.308,0,18.7-8.392,18.7-18.7s-8.392-18.7-18.7-18.7s-18.7,8.392-18.7,18.7S117.518,39.584,127.826,39.584 z M26.21,39.584c-10.308,0-18.7-8.392-18.7-18.7s8.392-18.7,18.7-18.7s18.7,8.392,18.7,18.7S36.518,39.584,26.21,39.584z M229.79,39.584c10.308,0,18.7-8.392,18.7-18.7s-8.392-18.7-18.7-18.7c-10.308,0-18.7,8.392-18.7,18.7S219.482,39.584,229.79,39.584 z M253.966,130.048c0,3.167-4.598,95.372-4.598,95.372c0,6.998-5.398,12.396-12.396,12.396c-6.998,0-12.396-5.398-12.396-12.396 c0,0-8.617-95.972-10.995-131.806l-19.741,23.724c-1.694,2.035-4.194,3.192-6.808,3.192c-0.339,0-0.68-0.019-1.021-0.059 c-2.972-0.345-5.569-2.165-6.905-4.842l-23.665-47.388v156.056c0,7.435-5.504,13.517-12.359,13.517 c-6.855,0-12.359-6.082-12.359-13.517V138.85c0-1.352-1.159-2.511-2.511-2.511c-1.352,0-2.511,1.159-2.511,2.511v85.448 c0,7.435-5.504,13.517-12.359,13.517c-6.855,0-12.359-6.082-12.359-13.517V67.387l-24.092,48.243 c-1.336,2.677-3.933,4.497-6.904,4.842c-0.341,0.039-0.682,0.059-1.021,0.059c-2.613,0-5.114-1.157-6.808-3.192L42.419,93.614 c-2.378,35.834-10.995,131.805-10.995,131.805c0,6.998-5.398,12.396-12.396,12.396s-12.396-5.398-12.396-12.396 c0,0-4.598-92.204-4.598-95.371c0,0-0.034-71.339-0.034-71.57c0-7.97,6.091-13.605,13.605-13.605c5.692,0,10.073,1.924,14.649,6.516 c0.131,0.132,36.851,44.193,36.851,44.193c-0.062-0.074,16.261-33.095,19.507-39.002c4.344-7.903,10.612-11.71,18.6-11.765 c0.019,0,0.041-0.005,0.059-0.005c0,0,45.073,0.012,45.348,0.022c8.069-0.022,14.396,3.788,18.772,11.752 c0.091,0.157,19.506,38.998,19.506,38.998s36.714-44.061,36.854-44.196c4.473-4.689,9.55-6.513,14.645-6.513 c7.514,0,13.605,6.091,13.605,13.605C254,61.212,253.966,130.048,253.966,130.048z"></path> </g></svg>
			);
		case 'arrowl':
			return (
				<svg viewBox="0 0 24 24" onClick={action} width={size} cursor="pointer" height={size} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M4 12L8 8M4 12L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
			);
		case 'chevron-down':
			return (
				<svg viewBox="0 0 24 24" onClick={action} width={size} cursor="pointer" height={size} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Arrow / Chevron_Down"> <path id="Vector" d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
			);
		case 'chevron-up':
			return (
				<svg viewBox="0 0 20 20" onClick={action} width={size} cursor="pointer" height={size} xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 13l-6-6-6 6"></path> </g></svg>
			);
		case 'eye':
			return (
				<svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="SVGRepo_iconCarrier">
						<path d="M12 5.25C4.5 5.25 1.5 12 1.5 12C1.5 12 4.5 18.75 12 18.75C19.5 18.75 22.5 12 22.5 12C22.5 12 19.5 5.25 12 5.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</g>
				</svg>
			);
		case 'car':
			return (
				<svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
			);
		case 'calendar':
			return (
				<svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 10H17M7 14H12M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
			);
		case 'message-square':
			return (
				<svg viewBox="0 0 24 24" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
			);
		case 'log-out':
			return (
				<svg viewBox="0 0 512 512" width={size} height={size} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>log-out</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Combined-Shape" fill="currentColor" transform="translate(85.333333, 42.666667)"> <path d="M234.666667,-2.13162821e-14 L234.666667,85.3333333 L192.000667,85.333 L192,42.6666667 L42.6666667,42.6666667 L42.6666667,384 L192,384 L192.000667,341.333 L234.666667,341.333333 L234.666667,426.666667 L-4.26325641e-14,426.666667 L-4.26325641e-14,-2.13162821e-14 L234.666667,-2.13162821e-14 Z M292.418278,112.915055 L392.836556,213.333333 L292.418278,313.751611 L262.248389,283.581722 L311.163,234.666 L106.666667,234.666667 L106.666667,192 L311.163,192 L262.248389,143.084945 L292.418278,112.915055 Z"> </path> </g> </g> </g></svg>
			);
		case 'settings':
			return (
				<svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="3" stroke="#1C274C" stroke-width="1.5"></circle> <path d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z" stroke="currentColor" stroke-width="1.5"></path> </g></svg>
			);
		case 'valid':
			return (
				<svg viewBox="0 0 16 16"  width={size} height={size}version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#444" d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path> </g></svg>);
		case 'HalfStar':
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} >
					<defs>
						<clipPath id="half-star">
							<rect x="0" y="0" width="1rem" height="2rem" />
						</clipPath>
					</defs>
					<path
						d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
						clipPath="url(#half-star)"
					/>
				</svg>
			);
		case 'EmptyStar':
			return (
				<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
			);
		case 'FullStar':
			return (
				<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor   ">
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
			);
		case 'avatar':
			return (
				<svg
					version="1.1"
					id="Capa_1"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 144.773 144.773"
					xmlSpace="preserve"
					fill="#000000"
					width={size} height={size}
				>
					<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
					<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
					<g id="SVGRepo_iconCarrier">
						<g>
							<circle style={{ fill: "#FC611F" }} cx="72.387" cy="72.386" r="72.386"></circle>
							<g>
								<defs>
									<circle id="SVGID_1_" cx="72.387" cy="72.386" r="72.386"></circle>
								</defs>
								<clipPath id="SVGID_2_">
									<use xlinkHref="#SVGID_1_" style={{ overflow: "visible" }}></use>
								</clipPath>
								<g style={{ clipPath: "url(#SVGID_2_)" }}>
									<g>
										<path style={{ fill: "#F1C9A5" }} d="M107.053,116.94c-4.666-8.833-34.666-14.376-34.666-14.376s-30,5.543-34.666,14.376 c-3.449,12.258-6.334,27.833-6.334,27.833h41h41C113.387,144.773,111.438,128.073,107.053,116.94z"></path>
										<path style={{ fill: "#E4B692" }} d="M72.387,102.564c0,0,30,5.543,34.666,14.376c4.386,11.133,6.334,27.833,6.334,27.833h-41V102.564 z"></path>
										<rect x="64.22" y="84.606" style={{ fill: "#E4B692" }} width="16.334" height="27.336"></rect>
										<rect x="72.387" y="84.606" style={{ fill: "#E4B692" }} width="8.167" height="27.336"></rect>
										<path style={{ opacity: 0.1, fill: "#DDAC8C" }} d="M64.22,97.273c1.469,4.217,7.397,6.634,11.751,6.634 c1.575,0,3.107-0.264,4.583-0.747V84.606H64.22V97.273z"></path>
										<path style={{ fill: "#F1C9A5" }} d="M93.387,67.357c0-17.074-9.402-26.783-21-26.783c-11.598,0-21,9.709-21,26.783 c0,22.966,9.402,30.917,21,30.917C83.984,98.274,93.387,89.366,93.387,67.357z"></path>
										<path style={{ fill: "#E4B692" }} d="M90.19,79.197c-3.807-0.398-6.377-4.5-5.732-9.156c0.637-4.66,4.242-8.12,8.051-7.724 c3.805,0.396,6.371,4.496,5.729,9.156C97.599,76.134,93.997,79.591,90.19,79.197z"></path>
										<path style={{ fill: "#F1C9A5" }} d="M46.685,71.474c-0.643-4.66,1.924-8.76,5.727-9.156c3.811-0.397,7.416,3.063,8.055,7.724 c0.642,4.656-1.93,8.758-5.734,9.156C50.925,79.591,47.323,76.134,46.685,71.474z"></path>
										<path style={{ fill: "#E4B692" }} d="M93.387,67.357c0-17.074-9.402-26.783-21-26.783v57.7C83.984,98.274,93.387,89.366,93.387,67.357 z"></path>
									</g>
									<path style={{ fill: "#2E5870" }} d="M91.277,81.668c-1.13,3.176-3.041,6.994-6.494,6.994c-4.316,0-7.403-3.508-12.354-3.508 c-0.014,0-0.027,0.002-0.041,0.002c-0.015,0-0.028-0.002-0.043-0.002c-4.95,0-8.036,3.508-12.354,3.508 c-3.453,0-5.363-3.818-6.493-6.994l-0.978-6.118v7.321c0,0,1.641,8.622,4.79,10.705c2.565,2.279,10.938,6.183,15.033,6.183h0.001 c0.014,0,0.028-0.002,0.043-0.002c0.014,0,0.028,0.002,0.041,0.002h0.002c4.096,0,12.469-3.903,15.033-6.183 c3.149-2.083,4.79-10.705,4.79-10.705V75.55L91.277,81.668z"></path>
									<path style={{ fill: "#11B2BC" }} d="M107.053,116.94c-2.726-5.158-14.082-9.191-23.065-11.656c-0.351,6.11-5.402,10.96-11.6,10.96 c-6.198,0-11.249-4.85-11.601-10.96c-8.983,2.465-20.34,6.498-23.065,11.656c-3.449,12.258-6.334,27.833-6.334,27.833h41h41 C113.387,144.773,111.438,128.073,107.053,116.94z"></path>
									<path style={{ fill: "#1695A6" }} d="M32.264,140.273c-0.555,2.763-0.877,4.5-0.877,4.5h41h41c0,0-0.205-1.756-0.631-4.5H32.264z"></path>
									<path style={{ fill: "#1695A6" }} d="M33.192,135.773H112c-0.257-1.414-0.551-2.93-0.882-4.5H34.17 C33.817,132.855,33.49,134.367,33.192,135.773z"></path>
									<path style={{ fill: "#1695A6" }} d="M35.202,126.773h74.888c-0.374-1.507-0.78-3.019-1.221-4.5H36.302 C35.922,123.775,35.554,125.284,35.202,126.773z"></path>
									<path style={{ fill: "#1695A6" }} d="M72.387,116.244c-2.979,0-5.687-1.128-7.741-2.971h-23.41c-1.6,1.146-2.83,2.371-3.515,3.667 c-0.077,0.275-0.154,0.555-0.231,0.833h69.881c-0.104-0.28-0.21-0.56-0.317-0.833c-0.685-1.296-1.915-2.521-3.515-3.667h-23.41 C78.073,115.116,75.366,116.244,72.387,116.244z"></path>
									<g>
										<path style={{ fill: "#1695A6" }} d="M50.066,108.773h11.477c-0.42-1.095-0.687-2.265-0.757-3.489 C57.354,106.226,53.577,107.398,50.066,108.773z"></path>
										<path style={{ fill: "#1695A6" }} d="M83.23,108.773h11.478c-3.512-1.375-7.288-2.548-10.721-3.489 C83.917,106.509,83.65,107.679,83.23,108.773z"></path>
									</g>
									<path style={{ fill: "#1695A6" }} d="M57.37,106.269c1.138,7.28,7.418,12.856,15.017,12.856c7.599,0,13.879-5.576,15.017-12.856 c-1.161-0.352-2.307-0.68-3.416-0.984c-0.351,6.11-5.402,10.96-11.6,10.96c-6.198,0-11.249-4.85-11.601-10.96 C59.677,105.589,58.531,105.917,57.37,106.269z"></path>
									<path style={{ fill: "#2E5870" }} d="M50.329,65.554c0,0,21.346-4.051,32.558-13.538c3.162,7.188,5.1,14.975,10.274,14.975 c2.588-14.373-4.312-26.663-17.822-26.663C61.827,40.327,50.616,47.154,50.329,65.554z"></path>
								</g>
							</g>
						</g>
					</g>
				</svg>);
		case 'eye-off':
			return (
				<svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="SVGRepo_iconCarrier">
						<path d="M9.9 4.24C10.5883 4.0781 11.2931 3.99683 12 4C19.5 4 22.5 12 22.5 12C22.0238 13.1155 21.3859 14.1655 20.6 15.12M14.12 14.12C13.8454 14.4147 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C4.5 20 1.5 12 1.5 12C2.33 10.2 3.37 8.6 4.6 7.28L17.94 17.94Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M1.5 1.5L22.5 22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</g>
				</svg>
			);
		default:
			return null;
	}
};

export default Icon;