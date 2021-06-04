//META{"name":"ReloadCall","authorId":"436557930918051842","invite":"uyAjXabBAF","donate":"https://www.paypal.me/ArmiceRp","website":"https://armice.fr"}*//

var ReloadCall = (_ => {
	var SO = false
			
	return class ReloadCall {
		getName () {return "ReloadCall";} 

		getVersion () {return "1.0.1";}

		getAuthor () {return "Walien";}

		getDescription () {return "Restart server call when it's laggy.";}


		
	
		// Settings  Panel
		getSettingsPanel() {
			this.SO = true
			return `
				<input type="checkbox" name="checkbox" id="checkbox_id" class="check-with-label" value="value" style="display:none">
				<label class="label-for-check" for="checkbox_id"><p>Définir raccourci : </p> <kbd id="ToucheSelect">`+ BdApi.getData(this.getName(), 'ReloadCall') +`</kbd></label>
				<style>
					.check-with-label:checked + .label-for-check {
						background: #3c45a5;
						color: #12fff;
					}

					label {
						padding: 8px;
						background: #5865f2;
						border-radius: 10px;
					}

					p {
						color: #fff;
						display: inline-block;
					}

					label:hover {
						color: #fff;
						cursor: pointer;
						font-weight: bold;
						background: #3c45a5;
					}

					kbd {
						background-color: #eee;
						border-radius: 3px;
						border: 1px solid #b4b4b4;
						box-shadow: 0 1px 1px rgba(0, 0, 0, .2), 0 2px 0 0 rgba(255, 255, 255, .7) inset;
						color: #333;
						display: inline-block;
						font-size: .85em;
						font-weight: 700;
						line-height: 1;
						padding: 2px 4px;
						white-space: nowrap;
					   }
				</style>
			`;
		} 


		constructor () {
			this.changelog = {
				"added":[["PLAYVAC","Reload call loaded"]]
			};

			this.patchedModules = {
				after: {
					MemberListItem: "default",
					MessageHeader: "default",
					UserPopout: "default"
				}
			};
		}

		// Legacy
		load () {}

		start () {
			this.initialize();		

			document.onkeydown = (keyDownEvent) => {
				if (this.initialized && (document.getElementsByClassName('bd-button button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN')[0] !== undefined && document.getElementById('checkbox_id').checked)) {
					document.getElementById('ToucheSelect').innerText = keyDownEvent.key
					document.getElementById('checkbox_id').checked = false
					
					BdApi.setData(this.getName(), 'ReloadCall', keyDownEvent.key);
				}


				if (this.initialized && BdApi.getData(this.getName(), 'ReloadCall') == keyDownEvent.key) {
					if (this.channel !== null) {
						if (document.querySelector(".name-1jkAdW") === null || document.querySelector(".name-1jkAdW").innerText != this.channelServer) {
						
							var elms = document.getElementsByClassName('wrapper-1BJsBx')
							for (var i = 0; i < elms.length; i++) {
								if (elms[i].ariaLabel.includes(this.channelServer)) {
									elms[i].click()
								}
							}

						}
					
						var elms = document.getElementsByClassName('channelName-2YrOjO')
						for (var i = 0; i < elms.length; i++) {
							if (elms[i].innerHTML == this.channel) {
								document.getElementsByClassName('button-14-BFJ enabled-2cQ-u7 button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN')[1].click()
								console.log("Connexion en cours au channel [" + this.channel + "]")
								elms[i].click()
							}
						}
					}
				}
			}
		}

		observer(changes) {
			if(document.querySelector(".channel-1TmDQ6") !== null) {
				this.channel = document.querySelector(".channel-1TmDQ6").innerText.split(' / ')[0]
				this.channelServer = document.querySelector(".channel-1TmDQ6").innerText.split(' / ')[1]
			} else {
				this.channel = null
			}
		}

		initialize () {
			this.initialized = true;
			console.log(this.getName() + " " + this.getVersion() + " has started.");

			if(BdApi.getData(this.getName(), 'ReloadCall') === undefined) {
				BdApi.setData(this.getName(), 'ReloadCall', 'Home');
			}
		}

		stop () {
			console.log(this.getName() + " " + this.getVersion() + " has stopped.");
			this.initialized = false;
		}

		logKey(e) {
			console.log(` ${e.code}`);
		  }

		
	}
})();