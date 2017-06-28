<template>
    <div id="cy" style="height:800px"></div> 
</template>

<script>
import cytoscape from 'cytoscape';

var self;

export default {
    name: 'postruct',
    components: {
    },
    data() {
        return {
            elements: {
                nodes: [
                /*
      {data: {id: 'a1', name: 'a11', type: 'po'}},
      {data: {id: 'a2', name: 'длинное русское название', type: 'comp'}},
      {data: {id: 'a3', type: 'soft'}},
      {data: {id: 'a4', type: 'soft'}},
      {data: {id: 'a5', type: 'comp'}},
      {data: {id: 'a6', type: 'comp'}},
      {data: {id: 'a7', type: 'comp'}},
      {data: {id: 'a8', type: 'comp'}} */
                ],
                edges: [
                /*
      {data: {source: 'a1', target: 'a2'}},
      {data: {source: 'a2', target: 'a3'}},
      {data: {source: 'a2', target: 'a4'}},
      {data: {source: 'a1', target: 'a5'}},
      {data: {source: 'a1', target: 'a6'}},
      {data: {source: 'a1', target: 'a7'}},
      {data: {source: 'a1', target: 'a8'}} */
                ]
            },
            cy: {}
        };
    },
    mounted() {
        console.log('cytoscape mounted');
        self = this;

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
    },
    beforeDestroy() {
        this.cy.off('grabon');
        this.cy.destroy();
        this.cy = null;
        this.elements = null;
        console.log('beforeDestroy');
    },
    watch: {
        po: function (npo) {
           // console.log('change soft');
            // collectCYElements(this.po);
            // this.cy.add(this.elements);
        }
    },
    computed: {
        po() {
            return Object.assign({}, this.$store.state.po.currPO);
        }
    },
    methods: {

    }
};

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

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >


</style>
