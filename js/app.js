(function (window) {
	// 'use strict';
	var vm = new Vue({
		el: '#app',
		data: {
			all: [],
			newCompleted: '',
			newEidt: '',
			newText: '',
			toggleList: 'all'
		},
		methods: {
			addSubmit() {
				// console.log(123);
				if (this.newText.trim() == '') {
					this.newText = '';
					alert('不能为空');
					return;
				}
				this.all.push({
					task: this.newText,
					isCompleted: false
				})
				this.newText = '';
			},
			isShow(value) {
				switch (this.toggleList) {
					case 'all':
						return true;
						break;
					case 'active':
						// 未完成
						return !value.isCompleted;
						break;
					case 'completed':
						return value.isCompleted;
						break;
				}
			},
			clearCompleted() {
				this.all = this.all.filter(value => {
					return !value.isCompleted;
				})
			}
		},
		computed: {
			// toggleAll() {
			// 	// console.log(1);
			// 	var tmp = this.all.filter(value => {
			// 		// console.log(!value.isCompleted);
			// 		return !value.isCompleted;
			// 	})
			// 	// console.log(tmp);
			// 	return tmp.length == 0 ? true : false
			// }
			toggleAll: {
				get() {
					var tmp = this.all.filter(value => {
						// console.log(!value.isCompleted);
						return !value.isCompleted;
					})
					// console.log(tmp);
					return tmp.length == 0 ? true : false
				},
				set(newCompleted) {
					console.log(newCompleted);
					for (var i = 0; i < this.all.length; i++) {
						this.all[i].isCompleted = newCompleted;
					}
				}
			}
		},
		mounted() {
			// console.log(JSON.parse(localStorage.getItem("todosList")));
			JSON.parse(localStorage.getItem("todosList")) ? this.all = JSON.parse(localStorage.getItem("todosList")) : [];
		},
		// 更新
		updated() {
			// console.log(this.all);
			localStorage.setItem('todosList', JSON.stringify(this.all));
		}
	})

})(window);
