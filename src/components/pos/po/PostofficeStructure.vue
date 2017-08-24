<template>
    <div id="cy" style="height:800px"></div> 
</template>

<script>
// import cytoscape from 'cytoscape';
import vis from 'vis';

var self;

export default {
    name: 'postruct',
    components: {
    },
    data() {
        return {
            elements: {
                nodes: '',
                edges: ''
            },
            options: {},
            cy: {},
            vis: {destroy: () => { true; }}
        };
    },
    mounted() {
        console.log('cytoscape mounted');
        self = this;
        /*
        collectCYElements(this.po);
        this.cy = window.cy = cytoscape({
            container: document.getElementById('cy'),

            boxSelectionEnabled: true,
            autounselectify: false,
            style: [
                {
                    selector: 'node',
                    css: {
                        'content': 'data(name)',
                        // 'background-image': 'file.svg',
                                    // 'background-image': 'http://png-4.findicons.com/files/icons/2015/24x24_free_application/24/text.png',
                        // 'shape': 'rectangle',
                        // 'height': '51px',
                       //  'width': '41px',
                       // 'background-opacity': '0'
                        'text-opacity': 0.5,
                        'text-valign': 'center',
                        'text-halign': 'right',
                        'background-color': '#FFF'
                    }
                },
                {
                    selector: 'node[type="comp"]',
                    css: {
                        'background-image': '../static/comp.svg'
                    }
                },
                {
                    selector: 'node[type="soft"]',
                    css: {
                        'background-image': '../static/soft.svg'
                    }
                },
                {
                    selector: 'node[type="po"]',
                    css: {
                        'background-image': '../static/po.svg',
                        'height': '50px',
                        'width': '50px'
                    }
                }
            ],
            elements: self.elements
        });

        this.cy.layout({name: 'cose'}).run();
        this.cy.nodes().on('grabon', (event) => {
            // console.log('clicked on node ' + event.target.id());
            let ndata = event.target.data();
            switch (ndata.type) {
                case 'po':
                    console.log('po');
                    break;
                case 'comp':
                    ndata.show = true;
                    this.$store.commit('SET_CURR_SOFT', {show: false});
                    this.$store.commit('SET_CURR_COMP', ndata);
                    this.$store.commit('SET_NEW_COMP', {show: false});
                    this.$store.commit('SET_NEW_SOFT', {show: false});
                    break;
                case 'soft':
                    ndata.show = true;
                    this.$store.commit('SET_CURR_COMP', {show: false});
                    this.$store.commit('SET_CURR_SOFT', ndata);
                    this.$store.commit('SET_NEW_COMP', {show: false});
                    this.$store.commit('SET_NEW_SOFT', {show: false});
                    break;
            }
        });
        */
        console.log('vis po', this.po);
        collectVisDataset(this.po);
        // create a network
        var container = document.getElementById('cy');
        this.vis = new vis.Network(container, this.elements, this.options);
        this.vis.on('click', function (params) {
            let ndata = self.elements.nodes.get(params.nodes[0]);
            switch (ndata.type) {
                case 'po':
                    console.log('po');
                    break;
                case 'comp':
                    ndata.show = true;
                    this.closeAll();
                    self.$store.commit('SET_CURR_COMP', ndata);

                    break;
                case 'soft':
                    ndata.show = true;
                    this.closeAll();
                    self.$store.commit('SET_CURR_SOFT', ndata);

                    break;
                case 'hard':
                    ndata.show = true;
                    this.closeAll();
                    self.$store.commit('SET_CURR_HARD', ndata);
                    break;
            }
        });
    },
    beforeDestroy() {
        /*
        this.cy.off('grabon');
        this.cy.destroy();
        this.cy = null;
        this.elements = null;
        */
        this.elements = null;
        this.vis.destroy();
        console.log('beforeDestroy');
    },
    watch: {
        po: function (npo) {
            // console.log('change soft');
            // collectCYElements(this.po);
            // this.cy.add(this.elements);
            // this.elements = null;
            this.vis.destroy();
            collectVisDataset(npo);
            // create a network
            var container = document.getElementById('cy');
            this.vis = new vis.Network(container, this.elements, this.options);
            this.vis.on('click', function (params) {
                let ndata = self.elements.nodes.get(params.nodes[0]);
                switch (ndata.type) {
                    case 'po':
                        console.log('po');
                        break;
                    case 'comp':
                        ndata.show = true;
                        this.closeAll();
                        self.$store.commit('SET_CURR_COMP', ndata);

                        break;
                    case 'soft':
                        ndata.show = true;
                        this.closeAll();
                        self.$store.commit('SET_CURR_SOFT', ndata);

                        break;
                    case 'hard':
                        ndata.show = true;
                        this.closeAll();
                        self.$store.commit('SET_CURR_HARD', ndata);
                        break;
                }
            });
        }
    },
    computed: {
        po() {
            // return Object.assign({}, this.$store.state.po.currPO);
            return this.$store.state.po.currPO;
        }
    },
    methods: {
        closeAll() {
            self.$store.commit('SET_CURR_COMP', {show: false});
            self.$store.commit('SET_CURR_SOFT', {show: false});
            self.$store.commit('SET_NEW_COMP', {show: false});
            self.$store.commit('SET_NEW_SOFT', {show: false});
            self.$store.commit('SET_CURR_HARD', {show: false});
            self.$store.commit('SET_NEW_HARD', {show: false});
        }

    }
};

function collectVisDataset(npo) {
    self.elements.nodes = [];
    self.elements.edges = [];
    self.elements.nodes.push({id: npo.postalCode, label: npo.postalCode, type: 'po', shape: 'image', image: '../static/po.svg'});
    npo.comps.forEach((comp, indx) => {
        let _addedprms = comp.addedprms === undefined ? [] : comp.addedprms.map(prm => prm);
        let node = {id: comp.id, indx: indx, type: 'comp', label: comp.title, description: comp.description, shape: 'image', image: '../static/comp.svg', addedprms: _addedprms};
        let edge = {from: comp.id, to: npo.postalCode};
        self.elements.nodes.push(node);
        self.elements.edges.push(edge);
        console.log('soft', comp.soft, comp.id);
        comp.soft.forEach((app, indx) => {
            let addedprms = app.addedprms === undefined ? [] : app.addedprms.map(prm => prm);
            let node = {id: app.id, indx: indx, type: 'soft', label: app.title, description: app.description, compid: comp.id, compname: comp.title, shape: 'image', image: '../static/soft.svg', addedprms: addedprms};
            let edge = {from: app.id, to: comp.id};
            self.elements.nodes.push(node);
            self.elements.edges.push(edge);
        });
        comp.hard = comp.hard || [];
        comp.hard.forEach((app, indx) => {
            let addedprms = app.addedprms === undefined ? [] : app.addedprms.map(prm => prm);
            let node = {id: app.id, indx: indx, type: 'hard', label: app.title, description: app.description, compid: comp.id, compname: comp.title, shape: 'image', image: '../static/hard.svg', addedprms: addedprms};
            let edge = {from: app.id, to: comp.id};
            self.elements.nodes.push(node);
            self.elements.edges.push(edge);
        });
    });
    self.elements.nodes = new vis.DataSet(self.elements.nodes);
    self.elements.edges = new vis.DataSet(self.elements.edges);
}

/*
function collectCYElements(npo) {
    console.log('npo');
    self.elements.nodes.push({data: {id: npo.postalCode, name: npo.postalCode, type: 'po'}});
    npo.comps.forEach(comp => {
        let node = {data: {id: comp.id, name: comp.title, type: 'comp', title: comp.title, description: comp.description}};
        let edge = {data: {source: comp.id, target: npo.postalCode}};
        self.elements.nodes.push(node);
        self.elements.edges.push(edge);
        comp.soft.forEach(app => {
            let node = {data: {id: app.id, name: app.title, type: 'soft', title: app.title, description: app.description, compname: comp.title}};
            let edge = {data: {source: app.id, target: comp.id}};
            self.elements.nodes.push(node);
            self.elements.edges.push(edge);
        });
    });
    console.log('npo', self.elements);
}
*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >


</style>
