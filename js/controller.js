function randd(min, max) {
  return Math.floor(arguments.length > 1 ? (max - min + 1) * Math.random() + min : (min + 1) * Math.random());
};

Vue.component('modalWin', {
	props: {
		title: {
			type: String,
			default: ""
		},
		content: {
			type: String,
			default: ""
		}
	},
	data: function(){
		return {
			
		};
	},
	methods: {
		close: function(){
			this.$emit('close');
		}
	},
	computed: {
		
	},

	template: `<div class="mod_win_wrapper" style='background: rgba(0, 0, 0, 0.7);' @click="close" @scroll.stop>
	<div class="mod_win">
		<span class="bCloseInfoWin" @click="close">×</span>
		<div class="mod_win_content" v-html="content">
		</div>	
	</div>
</div>`
});

Vue.component('searchfield', {
	props: {
		id: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			default: ""
		},
		value: {
			type: String,
			default: ""
		}
	},
	data: function(){
		return {};
	},
	methods: {
		input: function(oEvent){
			this.$emit('input', oEvent.target.value);
		},
		clear: function(){
			this.$emit('input', "");
		},
		random: function(){
			this.$emit('searchrndom');
		}
	},
	computed: {
		innerId: function(){
			return "sf_"+this.id;
		}
	},

	template: `<div :id="id">
	<label class='filterLabel' :for="innerId">{{title}}</label>
	<div style="display: flex">
		<div class="customInput">
			<input :id="innerId" type="text" :value='value' @input="input">
			<span class="cross" @click="clear"></span>
		</div>
		<a href="#random" class="bt flexChild" id="bRandom" title="Случайная черта" @click.stop="random">🎲</a>
	</div>
</div>`
});

Vue.component('hiddenitem', {
	props: {
		id: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			default: ""
		},
		tooltip: {
			type: String,
			default: ""
		}
	},
	data: function(){
		return {};
	},
	methods: {
		unhide: function(oEvent){
			this.$emit('unhide', oEvent);
		}
	},
	computed: {
	
	},

	template: `<a href='#' @click.stop="unhide">{{title}} ({{tooltip}})</a>`
});

Vue.component('comboboxItem', {
	props: {
		val: {
			type: String,
			default: '0'
		},
		title: {
			type: String,
			default: ""
		},
		checked: {
			type: Boolean,
			default: false
		}
	},
	data: function(){
		return {};
	},
	methods: {
		labelClick: function(oEvent){
			this.$emit('lclick', this.val);
		}
	},
	computed: {
		id: function(){
			return "ch_"+this.val;
		}
	},
	created: function(){
		
	},
	template: `<div>
	<input type="checkbox" :value="val" :id="id" :checked="checked">
	<label data-hierarchy="root" v-html="title" @click="labelClick"></label>
</div>`
});

Vue.component('combobox', {
	props: {
		value: {
			type: String,
			default: '0'
		},
		id: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			default: "#7986CB"
		},
		items: {
			type: Array,
			default: []
		},
		opened: {
			type: Boolean,
			default: false
		}
	},
	data: function(){
		return {
			open: null
		};
	},
	computed: {
		isOpen: function(){
			return (this.open!=null)?this.open : this.opened || false;
		}
	},
	methods: {
		toggle: function(oEvent, bStat){
			this.open = (bStat!=undefined)? bStat : !this.open;
			let el = $("#"+this.id).find(".combo_box_content");
			if(this.open) {
				el.slideDown(400, function(){
					this.$emit('opened', true);
				}.bind(this));				
			} else {
				el.slideUp(400, function(){
					this.$emit('opened', false);
				}.bind(this));
			}
		},
		itemclick: function(oEvent){
			this.$emit('iclick', oEvent);
		}
	},
	mounted: function(){
		if(!this.isOpen){
			let el = $("#"+this.id).find(".combo_box_content");
			el.hide();
		}
	},
	template: `<div :id="id" class="combo_box" :data-text="title" >
	<div class="combo_box_title" @click="toggle">{{title}}</div>
		<div class="combo_box_content">
			<comboboxItem v-for="item in items"
				:key="item.key"
				:val="item.key"
				:checked="item.checked"
				:title="item.title"
				@lclick="itemclick"
			>
			</comboboxItem>
		</div>
	<div class="combo_box_arrow" @click="toggle">
		<span class="arr_down" v-show="!isOpen">
			<i class="fa fa-arrow-down"></i>
		</span>
		<span class="arr_up" v-show="isOpen">
			<i class="fa fa-arrow-up"></i>
		</span>
	</div>
</div>`
});

Vue.component('custom-select', {
	props: {
		selected: {
			type: String,
			default: ''
		},
		id: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			default: "#7986CB"
		},
		items: {
			type: Array,
			default: []
		},
		bOpen: {
			type: Boolean,
			default: false
		}
	},
	data: function(){
		return {
			open: null
		};
	},
	computed: {
		isOpen: function(){
			return (this.open!=null)?this.open : this.bOpen || false;
		},
		selectedTile: function() {
			// let sKey = this.selected // key
			// let ret = sKey;
			// try{
				// ret = this.items.filter(el => el.key == sKey)[0].title;
			// } catch (err) {
				// console.dir(err);
				// console.log(sKey);
			// }
			// return ret
		}
	},
	methods: {
		toggle: function(){
			this.open = !this.open;
			let el = $("#"+this.id).find(".list");
			if(this.open) {
				el.slideDown(200);
			} else {
				el.slideUp(300);
			}
		},
		itemclick: function(sKey){ 
			this.toggle();
			this.$emit('iclick', sKey);
		}
	},
	mounted: function(){
		if(!this.isOpen){
			let el = $("#"+this.id).find(".combo_box_content");
			el.hide();
		}
	},
	template: `<div :id="id">
	<label class='filterLabel'>{{title}}</label>
	<button  class="customSelect" @click="toggle">
		<div class="label">{{selected}}</div>
		<ul class="list" style="display: none;">
			<li 
				v-for="item in items"
				:key="item.key"
				class="option"
				@click.stop="itemclick(item.key)"
				>{{item.title}}</li>
		</ul>
	</button>
</div>`
});

Vue.component('card', {
	props: {
		name: {
			type: String,
			default: ""
		},
		tooltip: {
			type: String,
			default: ""
		},
		id: {
			type: String,
			default: ""
		},
		text: {
			type: String,
			default: ""
		},
		src: {
			type: String,
			default: ""
		},
		source: {
			type: String,
			default: ""
		},
		color: {
			type: String,
			default: ""
		},
		selected: {
			type: Boolean,
			default: false
		},
		locked: {
			type: Boolean,
			default: false
		},
		spellType: {
			type: String,
			default: ""
		},
		pactType: {
			type: String,
			default: ""
		},
		minLevel: {
			type: String,
			default: ""
		},
		pre: {
			type: String,
			default: ""
		},
		view: {
			type: String,
			default: "card"
		},
		spellTitle: {
			type: String,
			default: ""
		},
		levelTitle: {
			type: String,
			default: ""
		},
		pactTitle: {
			type: String,
			default: ""
		}
	},
	data: function(){
		return {
			mainClass: "cardContainer"
		};
	},
	computed: {
		srcTitle: function(){
			return "Источник: "+ this.source;
		},
		typeClass: function(){
			let sClass = this.color.toLowerCase();
			switch(sClass) {
				case "skill proficiency": sClass = "skill"; break;
				case "tool proficiency": sClass = "tool"; break;
				case "world-specific": sClass = "world"; break;
			}
			return sClass;
		},
		selectedClass: function(){
			return this.selected? "selected" : "";
		},
		ItemCard: function(){
			return "ItemCard";
		},
		prerequisite: function(){
			let a=[];
			if(this.pactType) a.push(this.pactType);
			if(this.spellType) a.push(this.spellType);
			if(this.minLevel) a.push(this.minLevel);
			let sText = a.length>1? "Требуются: ": "Требуется ";
			
			return a.length>0? sText + a.join(", "): "";
		},
		cardView: function(){
			return this.view == 'card';
		},
		viewClass: function(){
			return this.cardView? "cardView": "textView";
		}
	},
	methods: {
		lock: function(oEvent){
			this.$emit('lock', oEvent);
		},
		unlock: function(oEvent){
			this.$emit('unlock', oEvent);
		},
		hide: function(oEvent){
			this.$emit('hide', oEvent);
		},
		select: function(oEvent){
			this.$emit('select', oEvent);
		}
	},

	template: `<div :class="[mainClass, viewClass, typeClass]" @click.ctrl="select">
	<div :class='[ItemCard, selectedClass]'>
		<div class="content">
			<span v-show="locked" class="bUnlockItem" title="Открепить обратно" @click.stop="unlock"><i class="fa fa-unlock-alt" aria-hidden="true"></i></span>
			<span v-show="!locked" class="bLockItem" title="Закорепить черту (не будут действовать фильтры)" @click.stop="lock"><i class="fa fa-lock" aria-hidden="true"></i></span>
			<span class="bHideItem" title="Скрыть черту (будет внизу панели фильтров)" @click.stop="hide"><i class="fa fa-eye-slash" aria-hidden="true"></i></span>
			<div class='header_info'>
				<h1 :title="tooltip">{{name}}</h1>
				<div class='prerequisite' v-html="prerequisite"></div>
			</div>
			<div v-html="text" class='info'></div>
			<div class='source' :title="srcTitle">{{src}}</div>
		</div>
	</div>
</div>`
});
	
var app = new Vue({
	el: '#app',
	data: {
		aSources: oSources,
		aPactTypes: oPactTypes,
		aSpellTypes: oSpellTypes,
		aLanguages: oLanguages,
		aSort: oSort,
		aView: oView,
		aItems: allItems,
		sLang: "ru",
		sSort: "typeAlpha",
		sView: "card",
		sLevel: "0",
		sSearch: "",
		aHiddenItems: [],
		aLockedItems: [],
		aSelectedItems: [],
		aSelectedLockedItems: [],
		
		aDict: oDict,
		
		oConfig: {},
		bPactTypesOpend: false,
		bSpellTypesOpend: false,		
		bSourcesOpend: false,		
		bCardsAreVisible: false,	
		bAppIsReady: false,	
		
		bModalWinShow: false,
		sModalWinCont: ""
	},

	computed: {
		sOtherLang: function(){
			return (this.sLang=="ru")? "en": "ru";
		},
		aSrcList: function(){
			let a=[];
			for (var key in this.aSources){
				if(this.aSources[key].visible !== false){
					a.push({
						key: key,
						title: this.aSources[key].text.en.title + "<br>" + this.aSources[key].text.ru.title,
						checked: this.aSources[key].checked
					});
				}
			}
			return a;
		},
		
		aSrcSelected: function(){
			let aFiltered = this.aSrcList.filter(item => item.checked);
			return (aFiltered.length>0)? aFiltered.map(item => item.key) : this.aSrcList.map(item => item.key);
		},
		
		aPactTypeList: function(){
			let a=[];
			let i=0;
			for (var key in this.aPactTypes){
				if(this.aPactTypes[key].visible !== false){
					this.aPactTypes[key].i = i++;
					a.push({
						key: key,
						title: this.aPactTypes[key].text.en.title + "<br>" + this.aPactTypes[key].text.ru.title,
						checked: this.aPactTypes[key].checked
					});
				}
			}
			return a;
		},
		
		aPactTypeSelected: function(){
			let aFiltered = this.aPactTypeList.filter(item => item.checked);
			//return (aFiltered.length>0)? aFiltered.map(item => item.key) : this.aPactTypeList.map(item => item.key);
			return aFiltered.map(item => item.key);
		},
		
		aSpellTypeList: function(){
			let a=[];
			let i=0;
			for (var key in this.aSpellTypes){
				if(this.aSpellTypes[key].visible !== false){
					this.aSpellTypes[key].i = i++;
					a.push({
						key: key,
						title: this.aSpellTypes[key].text.en.title + "<br>" + this.aSpellTypes[key].text.ru.title,
						checked: this.aSpellTypes[key].checked
					});
				}
			}
			return a;
		},
		
		aSpellTypeSelected: function(){
			let aFiltered = this.aSpellTypeList.filter(item => item.checked);
			//return (aFiltered.length>0)? aFiltered.map(item => item.key) : this.aSpellTypeList.map(item => item.key);
			return aFiltered.map(item => item.key);
		},
		
		aLanguageList: function(){
			let a=[];
			for (var key in this.aLanguages){
				if(this.aLanguages[key].visible !== false){
					a.push({
						key: key,
						title: this.aLanguages[key].text[this.sLang].title
					});
				}
			}
			return a;
		},
		
		sLangSelected: function(){
			return this.aLanguages[this.sLang].text[this.sLang].title;
		},
		
		aSortList: function(){
			let a=[];
			for (var key in this.aSort){
				if(this.aSort[key].visible !== false){
					a.push({
						key: key,
						title: this.aSort[key].text[this.sLang].title
					});
				}
			}
			return a;
		},
		
		aViewtList: function(){
			let a=[];
			for (var key in this.aView){
				if(this.aView[key].visible !== false){
					a.push({
						key: key,
						title: this.aView[key].text[this.sLang].title
					});
				}
			}
			return a;
		},
		
		sViewSelected: function(){
			return this.aView[this.sView].text[this.sLang].title;
		},
		
		aLevel: function() {
			var a = this.aItems.filter(el => el.en.minLevel).map(el => el.en.minLevel);
			a.push(0);
			return a.filter(function(item, pos, self) {
					return self.indexOf(item) == pos;
			}).sort((a,b)=> a-b);
		},
		aLevelList: function(){
			// let a=[];
			// for (var key in this.aLevel){
				// if(this.aLevel[key].visible !== false){
					// a.push({
						// key: key,
						// title: this.aLevel[key].text[this.sLang].title
					// });
				// }
			// }
			// return a;
			let a=this.aLevel.map(el => ({key: el, title: el==0? "Любой" : el}));
			
			return a;
			//return this.aLevel;
		},
		
		sSortSelected: function(){
			return this.aSort[this.sSort].text[this.sLang].title;
		},
		
		sLevelSelected: function(){
			//return this.aLevel[this.sLevel].text[this.sLang].title;
			return this.aLevelList.filter(el => el.key == this.sLevel)[0].title;
			//return String(this.sLevel);
		},		
		
		sNameInput: function(){
			return this.sSearch.toLowerCase();
		},
		
		
		
		aItemsList: function(){
			let aFiltered = this.aItems.filter(function(oItem){
				//console.log(oItem.en.pactType);
				return (
					this.aSrcSelected.indexOf(oItem.en.source)>-1 && 
					(this.aPactTypeSelected.length? this.aPactTypeSelected.indexOf(oItem.en.pactType)>-1 : true) && 
					(this.aSpellTypeSelected.length? this.aSpellTypeSelected.indexOf(oItem.en.spellType)>-1 : true) && 
					(Number(this.sLevel)>0 && Number(oItem.en.minLevel) >= Number(this.sLevel) || this.sLevel == 0 || !this.sLevel) &&
						(
						oItem.en.name.toLowerCase().indexOf(this.sNameInput)>-1 || 
						oItem.ru.name.toLowerCase().indexOf(this.sNameInput)>-1
						)
					) &&
					this.aHiddenItems.indexOf(oItem.en.name)<0
			}.bind(this));
			
			return aFiltered.map(function(oItem){
				let o={
					"id": oItem.en.name,
					"name": oItem[this.sLang].name || oItem.en.name,
					"tooltip": oItem[this.sOtherLang].name || oItem.en.name,
					"text": oItem[this.sLang].text || oItem.en.text,
					"src": oItem[this.sLang].source || oItem.en.source,
					"source": this.aSources[oItem.en.source].text[this.sLang].title,
					"pactType": oItem.en.pactType? oDict.pact.text[this.sLang].title + this.aPactTypes[oItem.en.pactType].text[this.sLang].title : "",
					"pactTypeNum": oItem.en.pactType? this.aPactTypes[oItem.en.pactType].i: -1,
					"spellType": oItem.en.spellType? oDict.spell.text[this.sLang].title  + this.aSpellTypes[oItem.en.spellType].text[this.sLang].title: "",
					"spellTypeNum": oItem.en.spellType? this.aSpellTypes[oItem.en.spellType].i: -1,
					"minLevel": oItem.en.minLevel? oDict.level.text[this.sLang].title + oItem.en.minLevel : "",
					"color": oItem.en.type,
					"locked": this.aLockedItems.indexOf(oItem.en.name)>-1,
					"selected": this.aSelectedItems.indexOf(oItem.en.name)>-1
				};
				if(oItem[this.sLang].pre || oItem.en.pre) {
					o.pre = oItem[this.sLang].pre || oItem.en.pre;
				}
				return o;
			}.bind(this)).sort(function(a, b){
				if(this.sSort == "alpha") {
					if (a.name.toLowerCase().trim() < b.name.toLowerCase().trim())
						return -1;
					if (a.name.toLowerCase().trim() > b.name.toLowerCase().trim())
						return 1;						
					return 0
				} else {
					if (a.typeNum+a.name.toLowerCase().trim() < b.typeNum+b.name.toLowerCase().trim() )
						return -1;
					if (a.typeNum+a.name.toLowerCase().trim() > b.typeNum+b.name.toLowerCase().trim() )
						return 1;
					return 0
				}
			}.bind(this));
		},
		
		aLockedItemsList: function(){
			let aFiltered = this.aItems.filter(function(oItem){
				return 	this.aLockedItems.indexOf(oItem.en.name)>-1
			}.bind(this));
			return aFiltered.map(function(oItem){
				let o={
					"id": oItem.en.name,
					"name": oItem[this.sLang].name || oItem.en.name,
					"tooltip": oItem[this.sOtherLang].name || oItem.en.name,
					"text": oItem[this.sLang].text || oItem.en.text,
					"src": oItem[this.sLang].source || oItem.en.source,
					"source": this.aSources[oItem.en.source].text[this.sLang].title,
					"pactType": oItem.en.pactType? oDict.pact.text[this.sLang].title + this.aPactTypes[oItem.en.pactType].text[this.sLang].title : "",
					"pactTypeNum": oItem.en.pactType? this.aPactTypes[oItem.en.pactType].i: -1,
					"spellType": oItem.en.spellType? oDict.spell.text[this.sLang].title  + this.aSpellTypes[oItem.en.spellType].text[this.sLang].title: "",
					"spellTypeNum": oItem.en.spellType? this.aSpellTypes[oItem.en.spellType].i: -1,
					"minLevel": oItem.en.minLevel? oDict.level.text[this.sLang].title + oItem.en.minLevel : "",
					"color": oItem.en.type,
					"locked": this.aLockedItems.indexOf(oItem.en.name)>-1,
					"selected": this.aSelectedLockedItems.indexOf(oItem.en.name)>-1
				};
				if(oItem[this.sLang].pre || oItem.en.pre) {
					o.pre = oItem[this.sLang].pre || oItem.en.pre;
				}
				return o;
			}.bind(this));
		},
		
		aHiddenItemsList: function(){
			let aFiltered = this.aItems.filter(function(oItem){
				return 	this.aHiddenItems.indexOf(oItem.en.name)>-1
			}.bind(this)); 
			return aFiltered.map(function(oItem){
				let o={
					"id": oItem.en.name,
					"title": oItem[this.sLang].name || oItem.en.name,
					"tooltip": oItem[this.sOtherLang].name || oItem.en.name						
				};
				return o;
			}.bind(this));
		},
		
	},
	mounted: function() {
		this.loadConfigData();			
		this.sModalWinCont = $("#info_text").html();
		
		let bInfoIsRead = this.getConfig("infoIsRead");
		if(bInfoIsRead) {
			this.hideInfo();
			this.showCards();
		}
		
		this.getHash();			
		
		this.$refs.PactTypeCombobox.toggle(null, this.bPactTypesOpend);
		this.$refs.SourceCombobox.toggle(null, this.bSourcesOpend);
		
		this.updateHash();
		
		this.bAppIsReady = true;
	},
	methods: {
		onSourceChange: function(sKey){
			this.aSources[sKey].checked = !this.aSources[sKey].checked; 
			this.updateHash();
		},
		onPactTypeChange: function(sKey){
			this.aPactTypes[sKey].checked = !this.aPactTypes[sKey].checked; 
			this.updateHash();
		},
		onSpellTypeChange: function(sKey){
			this.aSpellTypes[sKey].checked = !this.aSpellTypes[sKey].checked; 
			this.updateHash();
		},
		onLanguageChange: function(sKey){
			this.sLang = sKey;
			this.setConfig("lang", sKey);
			
			this.updateHash();
		},
		onSortChange: function(sKey){
			this.sSort = sKey;
			this.updateHash();
			this.setConfig("sort", sKey);
		},
		onViewChange: function(sKey){
			this.sView = sKey;
			this.updateHash();
			this.setConfig("view", sKey);
		},
		onLevelChange: function(sKey){
			this.sLevel = sKey;
			this.updateHash();
			this.setConfig("level", sKey);
		},
		onSearchName: function(sValue){
			this.sSearch = sValue.trim();
			this.updateHash();
		},
		getRandomItem: function(){
			this.sSearch = "";
			this.sSearch = this.aItemsList[randd(0, this.aItemsList.length-1)].name;
			this.updateHash();
		},
		
		onPactTypesToggled: function(bStat){
				this.setConfig("pactTypesOpend", bStat);
		},
		onSpellTypesToggled: function(bStat){
				this.setConfig("spellTypesOpend", bStat);
		},
		onSourcesToggled: function(bStat){
				this.setConfig("sourcesOpend", bStat);
		},
		
		hideInfo(){
			$("#info_text").hide();
		},
		
		lockCard: function(oCard){
			if(this.aSelectedItems.length>0) {
				this.aSelectedItems.forEach(function(sId){
					if(this.aSelectedItems.indexOf(sId)>-1) {
						this.aLockedItems.push(sId);
					}
				}.bind(this));
				this.selectAll(false);
			} else {
				let id = oCard.id;
				if(this.aLockedItems.indexOf(id)<0) {
					this.aLockedItems.push(id);
				}
			}
			this.setConfig("locked", this.aLockedItems);
		},
		unlockCard: function(oCard){
			if(this.aSelectedLockedItems.length>0) {
				this.aSelectedLockedItems.forEach(function(sId){
					let nInd = this.aLockedItems.indexOf(sId);
					if(nInd>-1) {
						this.aLockedItems.splice(nInd, 1);
					}
				}.bind(this));
			} else {
				let id = oCard.id;
				let nInd = this.aLockedItems.indexOf(id);
				if(nInd>-1) {
					this.aLockedItems.splice(nInd, 1);
				}
			}
			this.setConfig("locked", this.aLockedItems);
		},
		hideCard: function(oCard){
			if(this.aSelectedItems.length>0) {
				this.aSelectedItems.forEach(function(sId){
					if(this.aSelectedItems.indexOf(sId)>-1) {
						this.aHiddenItems.push(sId);
					}
				}.bind(this));
				this.selectAll(false);
			} else {
				let id = oCard.id;
				if(this.aHiddenItems.indexOf(id)<0) {
					this.aHiddenItems.push(id);
				}
			}
		},
		unhideCard: function(sId){
			let nInd = this.aHiddenItems.indexOf(sId);
			if(nInd>-1) {
				this.aHiddenItems.splice(nInd, 1);
			}
		},
		unlockAll: function(){
			this.aLockedItems = [];
			this.setConfig("locked", this.aLockedItems);
		},
		unhideAll: function(){
			this.aHiddenItems = [];
		},
		
		selectCard: function(oCard){
			let id = oCard.id;
			let nInd = this.aSelectedItems.indexOf(id);
			if(nInd>-1) {
				this.aSelectedItems.splice(nInd, 1);
			} else {
					this.aSelectedItems.push(id);
			}
		},
		selectLockedCard: function(oCard){
			let id = oCard.id;
			let nInd = this.aSelectedLockedItems.indexOf(id);
			if(nInd>-1) {
				this.aSelectedLockedItems.splice(nInd, 1);
			} else {
				this.aSelectedLockedItems.push(id);
			}
		},
		selectAll: function(bStat){
			if(this.aSelectedItems.length>0 || bStat===false) {
				this.aSelectedItems = [];
				this.aSelectedLockedItems = [];
			} else {
				this.aSelectedItems = this.aItemsList.map(item => item.id);
			}				
		},
		
		
		updateHash: function() {
			var aHash = [];
			if(this.sSearch.length>0) {
				aHash.push("q="+this.sSearch.trim());
			}
			
			if(this.aSrcSelected.length != this.aSrcList.length) {
				aHash.push("src="+this.aSrcSelected.join(","));
			}
			if(this.aPactTypeSelected.length != this.aPactTypeList.length && this.aPactTypeSelected.length >0) {
				aHash.push("pactType="+this.aPactTypeSelected.join(","));
			}
			if(this.aSpellTypeSelected.length != this.aSpellTypeList.length && this.aSpellTypeSelected.length >0) {
				aHash.push("spellType="+this.aSpellTypeSelected.join(","));
			}
			if(this.sLang != "ru") {
				aHash.push("lang="+this.sLang);
			}
			// if(this.sSort != "typeAlpha") {
				// aHash.push("sort="+this.sSort);
			// }
			if(this.sView != "card") {
				aHash.push("view="+this.sView);
			}
			if(this.sLevel != "0") {
				aHash.push("level="+this.sLevel);
			}
			
			if(aHash.length>0) {
				window.location.hash = aHash.join("&").replace(/\s+/g, "_");
			} else {
				this.removeHash();
			}
		},
		removeHash: function(){
			history.pushState("", document.title, window.location.pathname + window.location.search);
			return false;
		},
		getHash(){
			var sHash = window.location.hash.slice(1); // /archive#q=Item_name
			sHash = decodeURIComponent(sHash).replace(/_/g, " ");
			var oHash = {};
			sHash.split("&").forEach(function(sPair){
				aPair = sPair.split("=");
				if(aPair[1]){
					oHash[aPair[0]] = /,/.test(aPair[1])? aPair[1].split(",") : aPair[1]
				}
			}.bind(this));
			
			if(oHash.src) {					
				for (let key in this.aSources) {
					if(oHash.src.indexOf(key)>-1) {
						this.aSources[key].checked=true;
					} else {
						this.aSources[key].checked=false;
					}
				}
			}
			if(oHash.pactType) {
				for (let key in this.aPactTypes) {
					if(oHash.pactType.indexOf(key)>-1) {
						this.aPactTypes[key].checked=true;
					} else {
						this.aPactTypes[key].checked=false;
					}
				}
			}
			if(oHash.spellType) {
				for (let key in this.aSpellTypes) {
					if(oHash.spellType.indexOf(key)>-1) {
						this.aSpellTypes[key].checked=true;
					} else {
						this.aSpellTypes[key].checked=false;
					}
				}
			}
			if(oHash.lang) {
				this.sLang = oHash.lang
			}
			if(oHash.sort) {
				this.sSort = oHash.sort
			}
			if(oHash.view) {
				this.sView = oHash.view
			}
			if(oHash.level) {
				this.sLevel = oHash.level
			}
			if(oHash.q) {
				this.sSearch = oHash.q[0];
			}
			
		},
		
		showInfo: function(){
			this.bModalWinShow = true;
		},
		closeMosWin: function(){
			this.bModalWinShow = false;
		},
		print: function(){
			window.print();
			return false;
		},
		
		showCards: function(){
			this.bCardsAreVisible = true;
		},
		
		showAllItems: function(){
			this.closeMosWin();
			this.hideInfo();
			this.showCards();
			this.setConfig("infoIsRead", true);
		},
		
		setConfig: function (prop, val) {
			if(prop && val != undefined && this.oConfig) {
				this.oConfig[prop] = val;
				localStorage.setItem("envocation_config", JSON.stringify(this.oConfig));
			}
		},
		getConfig: function (prop) {
			this.oConfig = JSON.parse(localStorage.getItem("envocation_config")) || {};
			if(prop!=undefined) {
				return localStorage.getItem("envocation_config")? this.oConfig[prop] : null;
			}
			return ""; 
		},
		
		loadConfigData: function(){
			let sTmpLang = this.getConfig("lang");
			if(sTmpLang){
				this.sLang = sTmpLang;					
			}
			
			let sTmpSort = this.getConfig("sort");
			if(sTmpSort){
				this.sSort = sTmpSort;					
			}
			
			let aTmpLocked = this.getConfig("locked");
			if(aTmpLocked) {
				this.aLockedItems = aTmpLocked;
			}
			
			let bTmpPactTypesOpend = this.getConfig("pactTypesOpend");
			if(bTmpPactTypesOpend != undefined) {
				this.bPactTypesOpend = bTmpPactTypesOpend
			}
			
			let bTmpSpellTypesOpend = this.getConfig("spellTypesOpend");
			if(bTmpSpellTypesOpend != undefined) {
				this.bSpellTypesOpend = bTmpSpellTypesOpend
			}
			
			let bTMPSourcesOpend = this.getConfig("sourcesOpend");
			if(bTMPSourcesOpend != undefined) {		
				this.bSourcesOpend = bTMPSourcesOpend;					
			}	
		}
	}
});