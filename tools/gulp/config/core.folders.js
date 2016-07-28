let folders = {
    root: './'
};

// Root-level folders
folders.bower = `${folders.root}bower_components/`;
folders.build = `${folders.root}.build/`;
folders.client = `${folders.root}client/`;
folders.nodeModules = `${folders.root}node_modules/`;
folders.server = `${folders.root}server/`;
folders.tools = `${folders.root}tools/`;
folders.typings = `${folders.root}typings/`;
folders.webserver = `${folders.root}webserver/`;

// Client folders
folders.assets = `${folders.client}assets/`;
folders.modules = `${folders.client}modules/`;

// Output folders
folders.devBuild = `${folders.build}.dev/`;
folders.devBuildScripts = `${folders.devBuild}js/`;
folders.devBuildStyles = `${folders.devBuild}css/`;
folders.distBuild = `${folders.build}.dist/`;

module.exports = folders;
