angular.module('Curve')
	.factory('Territories', function TerritoriesFactory(){
		var Territories = [{"code":"DZ","name":"Algeria","country":"Africa"},{"code":"AO","name":"Angola","country":"Africa"},{"code":"BJ","name":"Benin","country":"Africa"},{"code":"BW","name":"Botswana","country":"Africa"},{"code":"BF","name":"Burkina Faso","country":"Africa"},{"code":"BI","name":"Burundi","country":"Africa"},{"code":"CM","name":"Cameroon","country":"Africa"},{"code":"CV","name":"Cape Verde","country":"Africa"},{"code":"CF","name":"Central African Republic","country":"Africa"},{"code":"TD","name":"Chad","country":"Africa"},{"code":"KM","name":"Comoros","country":"Africa"},{"code":"CG","name":"Congo, Republic of the","country":"Africa"},{"code":"CD","name":"Congo, The Democratic Republic Of The","country":"Africa"},{"code":"CI","name":"Cote d'Ivoire","country":"Africa"},{"code":"DJ","name":"Djibouti","country":"Africa"},{"code":"EG","name":"Egypt","country":"Africa"},{"code":"GQ","name":"Equatorial Guinea","country":"Africa"},{"code":"ER","name":"Eritrea","country":"Africa"},{"code":"ET","name":"Ethiopia","country":"Africa"},{"code":"GA","name":"Gabon","country":"Africa"},{"code":"GM","name":"Gambia, The","country":"Africa"},{"code":"GH","name":"Ghana","country":"Africa"},{"code":"GN","name":"Guinea","country":"Africa"},{"code":"GW","name":"Guinea-Bissau","country":"Africa"},{"code":"KE","name":"Kenya","country":"Africa"},{"code":"LS","name":"Lesotho","country":"Africa"},{"code":"LR","name":"Liberia","country":"Africa"},{"code":"LY","name":"Libya","country":"Africa"},{"code":"MG","name":"Madagascar","country":"Africa"},{"code":"MW","name":"Malawi","country":"Africa"},{"code":"ML","name":"Mali","country":"Africa"},{"code":"MR","name":"Mauritania","country":"Africa"},{"code":"MU","name":"Mauritius","country":"Africa"},{"code":"YT","name":"Mayotte","country":"Africa"},{"code":"MA","name":"Morocco","country":"Africa"},{"code":"MZ","name":"Mozambique","country":"Africa"},{"code":"NA","name":"Namibia","country":"Africa"},{"code":"NE","name":"Niger","country":"Africa"},{"code":"NG","name":"Nigeria","country":"Africa"},{"code":"RE","name":"Reunion","country":"Africa"},{"code":"RW","name":"Rwanda","country":"Africa"},{"code":"SH","name":"Saint Helena","country":"Africa"},{"code":"ST","name":"Sao Tome and Principe","country":"Africa"},{"code":"SN","name":"Senegal","country":"Africa"},{"code":"SC","name":"Seychelles","country":"Africa"},{"code":"SL","name":"Sierra Leone","country":"Africa"},{"code":"SO","name":"Somalia","country":"Africa"},{"code":"ZA","name":"South Africa","country":"Africa"},{"code":"SS","name":"South Sudan","country":"Africa"},{"code":"SD","name":"Sudan","country":"Africa"},{"code":"SZ","name":"Swaziland","country":"Africa"},{"code":"TZ","name":"Tanzania","country":"Africa"},{"code":"TG","name":"Togo","country":"Africa"},{"code":"TN","name":"Tunisia","country":"Africa"},{"code":"UG","name":"Uganda","country":"Africa"},{"code":"EH","name":"Western Sahara","country":"Africa"},{"code":"ZM","name":"Zambia","country":"Africa"},{"code":"ZW","name":"Zimbabwe","country":"Africa"},{"code":"AW","name":"(Netherlands Antilles) Aruba","country":"Americas"},{"code":"AI","name":"Anguilla","country":"Americas"},{"code":"AG","name":"Antigua and Barbuda","country":"Americas"},{"code":"AR","name":"Argentina","country":"Americas"},{"code":"BS","name":"Bahamas, The","country":"Americas"},{"code":"BB","name":"Barbados","country":"Americas"},{"code":"BZ","name":"Belize","country":"Americas"},{"code":"BM","name":"Bermuda","country":"Americas"},{"code":"BO","name":"Bolivia","country":"Americas"},{"code":"BR","name":"Brazil","country":"Americas"},{"code":"VG","name":"British Virgin Islands","country":"Americas"},{"code":"CA","name":"Canada","country":"Americas"},{"code":"KY","name":"Cayman Islands","country":"Americas"},{"code":"CL","name":"Chile","country":"Americas"},{"code":"CO","name":"Colombia","country":"Americas"},{"code":"CR","name":"Costa Rica","country":"Americas"},{"code":"CU","name":"Cuba","country":"Americas"},{"code":"DM","name":"Dominica","country":"Americas"},{"code":"DO","name":"Dominican Republic","country":"Americas"},{"code":"EC","name":"Ecuador","country":"Americas"},{"code":"SV","name":"El Salvador","country":"Americas"},{"code":"FK","name":"Falkland Islands (Islas Malvinas)","country":"Americas"},{"code":"GF","name":"French Guiana","country":"Americas"},{"code":"GL","name":"Greenland","country":"Americas"},{"code":"GD","name":"Grenada","country":"Americas"},{"code":"GP","name":"Guadeloupe","country":"Americas"},{"code":"GT","name":"Guatemala","country":"Americas"},{"code":"GY","name":"Guyana","country":"Americas"},{"code":"HT","name":"Haiti","country":"Americas"},{"code":"HN","name":"Honduras","country":"Americas"},{"code":"JM","name":"Jamaica","country":"Americas"},{"code":"MQ","name":"Martinique","country":"Americas"},{"code":"MX","name":"Mexico","country":"Americas"},{"code":"MS","name":"Montserrat","country":"Americas"},{"code":"AN","name":"Netherlands Antilles","country":"Americas"},{"code":"NI","name":"Nicaragua","country":"Americas"},{"code":"PA","name":"Panama","country":"Americas"},{"code":"PY","name":"Paraguay","country":"Americas"},{"code":"PE","name":"Peru","country":"Americas"},{"code":"PR","name":"Puerto Rico","country":"Americas"},{"code":"BL","name":"Saint Barthélemy","country":"Americas"},{"code":"KN","name":"Saint Kitts and Nevis","country":"Americas"},{"code":"LC","name":"Saint Lucia","country":"Americas"},{"code":"MF","name":"Saint Martin","country":"Americas"},{"code":"PM","name":"Saint Pierre and Miquelon","country":"Americas"},{"code":"VC","name":"Saint Vincent and the Grenadines","country":"Americas"},{"code":"SR","name":"Suriname","country":"Americas"},{"code":"TT","name":"Trinidad and Tobago","country":"Americas"},{"code":"TC","name":"Turks and Caicos Islands","country":"Americas"},{"code":"US","name":"United States","country":"Americas"},{"code":"UY","name":"Uruguay","country":"Americas"},{"code":"VE","name":"Venezuela","country":"Americas"},{"code":"VI","name":"Virgin Islands","country":"Americas"},{"code":"AF","name":"Afghanistan","country":"Asia"},{"code":"AM","name":"Armenia","country":"Asia"},{"code":"AZ","name":"Azerbaijan","country":"Asia"},{"code":"BH","name":"Bahrain","country":"Asia"},{"code":"BD","name":"Bangladesh","country":"Asia"},{"code":"BT","name":"Bhutan","country":"Asia"},{"code":"BN","name":"Brunei","country":"Asia"},{"code":"KH","name":"Cambodia","country":"Asia"},{"code":"CN","name":"China","country":"Asia"},{"code":"GE","name":"Georgia","country":"Asia"},{"code":"HK","name":"Hong Kong","country":"Asia"},{"code":"IN","name":"India","country":"Asia"},{"code":"ID","name":"Indonesia","country":"Asia"},{"code":"IR","name":"Iran","country":"Asia"},{"code":"IQ","name":"Iraq","country":"Asia"},{"code":"IL","name":"Israel","country":"Asia"},{"code":"JP","name":"Japan","country":"Asia"},{"code":"JO","name":"Jordan","country":"Asia"},{"code":"KZ","name":"Kazakhstan","country":"Asia"},{"code":"KP","name":"Korea, North","country":"Asia"},{"code":"KR","name":"Korea, South","country":"Asia"},{"code":"KW","name":"Kuwait","country":"Asia"},{"code":"KG","name":"Kyrgyzstan","country":"Asia"},{"code":"LA","name":"Laos","country":"Asia"},{"code":"LB","name":"Lebanon","country":"Asia"},{"code":"MO","name":"Macao","country":"Asia"},{"code":"MY","name":"Malaysia","country":"Asia"},{"code":"MV","name":"Maldives","country":"Asia"},{"code":"MN","name":"Mongolia","country":"Asia"},{"code":"MM","name":"Myanmar (Burma)","country":"Asia"},{"code":"NP","name":"Nepal","country":"Asia"},{"code":"OM","name":"Oman","country":"Asia"},{"code":"PK","name":"Pakistan","country":"Asia"},{"code":"PS","name":"Palestinian Territories","country":"Asia"},{"code":"PH","name":"Philippines","country":"Asia"},{"code":"QA","name":"Qatar","country":"Asia"},{"code":"SA","name":"Saudi Arabia","country":"Asia"},{"code":"SG","name":"Singapore","country":"Asia"},{"code":"LK","name":"Sri Lanka","country":"Asia"},{"code":"SY","name":"Syria","country":"Asia"},{"code":"TW","name":"Taiwan","country":"Asia"},{"code":"TJ","name":"Tajikistan","country":"Asia"},{"code":"TH","name":"Thailand","country":"Asia"},{"code":"TL","name":"Timor-Leste","country":"Asia"},{"code":"TR","name":"Turkey","country":"Asia"},{"code":"TM","name":"Turkmenistan","country":"Asia"},{"code":"AE","name":"United Arab Emirates","country":"Asia"},{"code":"UZ","name":"Uzbekistan","country":"Asia"},{"code":"VN","name":"Vietnam","country":"Asia"},{"code":"YE","name":"Yemen","country":"Asia"},{"code":"AL","name":"Albania","country":"Europe"},{"code":"AD","name":"Andorra","country":"Europe"},{"code":"AT","name":"Austria","country":"Europe"},{"code":"BY","name":"Belarus","country":"Europe"},{"code":"BE","name":"Belgium","country":"Europe"},{"code":"BA","name":"Bosnia and Herzegovina","country":"Europe"},{"code":"BG","name":"Bulgaria","country":"Europe"},{"code":"HR","name":"Croatia","country":"Europe"},{"code":"CY","name":"Cyprus","country":"Europe"},{"code":"CZ","name":"Czech Republic","country":"Europe"},{"code":"DK","name":"Denmark","country":"Europe"},{"code":"EE","name":"Estonia","country":"Europe"},{"code":"FO","name":"Faroe Islands","country":"Europe"},{"code":"FI","name":"Finland","country":"Europe"},{"code":"FR","name":"France","country":"Europe"},{"code":"DE","name":"Germany","country":"Europe"},{"code":"GI","name":"Gibraltar","country":"Europe"},{"code":"GR","name":"Greece","country":"Europe"},{"code":"GG","name":"Guernsey","country":"Europe"},{"code":"VA","name":"Holy See (Vatican City)","country":"Europe"},{"code":"HU","name":"Hungary","country":"Europe"},{"code":"IS","name":"Iceland","country":"Europe"},{"code":"IE","name":"Ireland","country":"Europe"},{"code":"IM","name":"Isle Of Man","country":"Europe"},{"code":"IT","name":"Italy","country":"Europe"},{"code":"JE","name":"Jersey","country":"Europe"},{"code":"LV","name":"Latvia","country":"Europe"},{"code":"LI","name":"Liechtenstein","country":"Europe"},{"code":"LT","name":"Lithuania","country":"Europe"},{"code":"LU","name":"Luxembourg","country":"Europe"},{"code":"MK","name":"Macedonia","country":"Europe"},{"code":"MT","name":"Malta","country":"Europe"},{"code":"MD","name":"Moldova","country":"Europe"},{"code":"MC","name":"Monaco","country":"Europe"},{"code":"ME","name":"Montenegro","country":"Europe"},{"code":"NL","name":"Netherlands","country":"Europe"},{"code":"NO","name":"Norway","country":"Europe"},{"code":"PL","name":"Poland","country":"Europe"},{"code":"PT","name":"Portugal","country":"Europe"},{"code":"RO","name":"Romania","country":"Europe"},{"code":"RU","name":"Russia","country":"Europe"},{"code":"SM","name":"San Marino","country":"Europe"},{"code":"RS","name":"Serbia","country":"Europe"},{"code":"SK","name":"Slovakia","country":"Europe"},{"code":"SI","name":"Slovenia","country":"Europe"},{"code":"ES","name":"Spain","country":"Europe"},{"code":"SJ","name":"Svalbard","country":"Europe"},{"code":"SE","name":"Sweden","country":"Europe"},{"code":"CH","name":"Switzerland","country":"Europe"},{"code":"UA","name":"Ukraine","country":"Europe"},{"code":"GB","name":"United Kingdom","country":"Europe"},{"code":"AX","name":"Åland Islands","country":"Europe"},{"code":"AS","name":"American Samoa","country":"Oceania"},{"code":"AQ","name":"Antarctica","country":"Oceania"},{"code":"AU","name":"Australia","country":"Oceania"},{"code":"BV","name":"Bouvet Island","country":"Oceania"},{"code":"IO","name":"British Indian Ocean Territory","country":"Oceania"},{"code":"CX","name":"Christmas Island","country":"Oceania"},{"code":"CC","name":"Cocos (Keeling) Islands","country":"Oceania"},{"code":"CK","name":"Cook Islands","country":"Oceania"},{"code":"FJ","name":"Fiji","country":"Oceania"},{"code":"PF","name":"French Polynesia","country":"Oceania"},{"code":"TF","name":"French Southern Territories","country":"Oceania"},{"code":"GU","name":"Guam","country":"Oceania"},{"code":"HM","name":"Heard and McDonald Islands","country":"Oceania"},{"code":"KI","name":"Kiribati","country":"Oceania"},{"code":"MH","name":"Marshall Islands","country":"Oceania"},{"code":"FM","name":"Micronesia, Federated States of","country":"Oceania"},{"code":"NR","name":"Nauru","country":"Oceania"},{"code":"NC","name":"New Caledonia","country":"Oceania"},{"code":"NZ","name":"New Zealand","country":"Oceania"},{"code":"NU","name":"Niue","country":"Oceania"},{"code":"NF","name":"Norfolk Island","country":"Oceania"},{"code":"MP","name":"Northern Mariana Islands","country":"Oceania"},{"code":"PW","name":"Palau","country":"Oceania"},{"code":"PG","name":"Papua New Guinea","country":"Oceania"},{"code":"PN","name":"Pitcairn Islands","country":"Oceania"},{"code":"SB","name":"Solomon Islands","country":"Oceania"},{"code":"GS","name":"South Georgia and South Sandwich Island","country":"Oceania"},{"code":"TK","name":"Tokelau","country":"Oceania"},{"code":"TO","name":"Tonga","country":"Oceania"},{"code":"TV","name":"Tuvalu","country":"Oceania"},{"code":"UM","name":"US Minor Outlying Islands","country":"Oceania"},{"code":"VU","name":"Vanuatu","country":"Oceania"},{"code":"WF","name":"Wallis and Futuna","country":"Oceania"},{"code":"WS","name":"Western Samoa","country":"Oceania"}];		return Territories;
		return Territories;
	});