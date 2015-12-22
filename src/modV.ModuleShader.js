(function(bModule) {
	'use strict';
	/*jslint browser: true */

	modV.prototype.ModuleShader = function(settings) {
		var self = this;
		
		// Module error handle
		function ModuleError(message) {
			// Grab the stack
			this.stack = (new Error()).stack;

			// Parse the stack for some helpful debug info
			var reg = /\((.*?)\)/;    
			var stackInfo = this.stack.split('\n').pop().trim();
			stackInfo = reg.exec(stackInfo)[0];

			// Expose name and message
			this.name = 'modV.Module Error';
			this.message = message + ' ' + stackInfo || 'Error';  
		}
		// Inherit from Error
		ModuleError.prototype = Object.create(Error.prototype);
		ModuleError.prototype.constructor = ModuleError;

		// Check for settings Object
		if(!settings) throw new ModuleError('Module had no settings');
		// Check for info Object
		if(!('info' in settings)) throw new ModuleError('Module had no info in settings');
		// Check for info.name
		if(!('name' in settings.info)) throw new ModuleError('Module had no name in settings.info');
		// Check for info.author
		if(!('author' in settings.info)) throw new ModuleError('Module had no author in settings.info');
		// Check for info.version
		if(!('version' in settings.info)) throw new ModuleError('Module had no version in settings.info');

		// Settings passed, expose self.info
		self.info = settings.info;

		// Create uniforms
		for(var key in self.uniforms) {
			
		}
		
		// Create material, geometry and mesh
		var geometry = new THREE.PlaneBufferGeometry( 10, 10, 32 );

		self.material = new THREE.ShaderMaterial({
			uniforms: {
				modVcanvas: {
					type: "t",
					value: texture
				}
			},
			vertexShader: document.getElementById('vertexshader').textContent,
			fragmentShader: document.getElementById('fragmentshader').textContent,
			side: THREE.DoubleSide
		});

		self.mesh = new THREE.Mesh(geometry, shaderMaterial);
	};

})(module);