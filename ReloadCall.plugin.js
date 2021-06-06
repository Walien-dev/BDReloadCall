//META{"name":"ReloadCall","authorId":"436557930918051842","invite":"uyAjXabBAF","donate":"https://www.paypal.me/ArmiceRp","website":"https://armice.fr", "source": "https://raw.githubusercontent.com/Walien-dev/BDReloadCall/main/ReloadCall.plugin.js"}*//

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
				<br>
				<input id="InputPing" placeholder="A quel ping deco/reco?" type="number" min="1" value="`+ BdApi.getData(this.getName(), 'MaxPing') +`" style="width:150px;">
				<input type="submit" value="Sauvegarder ping" onclick="BdApi.setData('`+ this.getName() +`', 'MaxPing', document.getElementById('InputPing').value)">
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

					   input[type=text] {
						padding:5px; 
						border:2px solid #ccc; 
						-webkit-border-radius: 5px;
						border-radius: 5px;
					}
					
					input[type=number]:focus {
						border-color:#333;
					}
					
					input[type=submit] {
						padding:5px 15px; 
						background:#ccc; 
						border:0 none;
						cursor:pointer;
						-webkit-border-radius: 5px;
						border-radius: 5px; 
					}

					input[type=submit]:hover {
						background:#dc0; 
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
					this.ReloadCall()
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

			this.ping = parseInt(document.querySelector('.ping-2NgC8E').ariaLabel.replace(' ms', ''))
			if (this.ping >= BdApi.getData(this.getName(), 'MaxPing')) {
				this.ReloadCall()
				console.error('Ping trop haut, tentative de reconnexion!')
			}
		}

		initialize () {
			this.initialized = true;
			console.log(this.getName() + " " + this.getVersion() + " has started.");

			if(BdApi.getData(this.getName(), 'ReloadCall') === undefined) {
				BdApi.setData(this.getName(), 'ReloadCall', 'Home');
			}
			if(BdApi.getData(this.getName(), 'MaxPing') === undefined) {
				BdApi.setData(this.getName(), 'MaxPing', '1500');
			}
		}

		stop () {
			console.log(this.getName() + " " + this.getVersion() + " has stopped.");
			this.initialized = false;
		}

		




		// Restart Call
		ReloadCall() {
			if (this.initialized && this.channel !== null) {
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
						var cadenas = elms[i].parentElement.parentElement.querySelector('.icon-1DeIlz').getElementsByTagName('path')[0].getAttribute('d')
						if (cadenas != LockedChannel) {
							document.querySelector('[aria-label="Déconnexion"]').click()
							console.log("Connexion en cours au channel [" + this.channel + "]")
							elms[i].click()
						} else {
							console.error('Vous n\'aurez pas la permission de vous reconnectez!')
						}
					}
				}
			}
		}

		
	}
})();
 


var LockedChannel = "M17 11V7C17 4.243 14.756 2 12 2C9.242 2 7 4.243 7 7V11C5.897 11 5 11.896 5 13V20C5 21.103 5.897 22 7 22H17C18.103 22 19 21.103 19 20V13C19 11.896 18.103 11 17 11ZM12 18C11.172 18 10.5 17.328 10.5 16.5C10.5 15.672 11.172 15 12 15C12.828 15 13.5 15.672 13.5 16.5C13.5 17.328 12.828 18 12 18ZM15 11H9V7C9 5.346 10.346 4 12 4C13.654 4 15 5.346 15 7V11Z"
