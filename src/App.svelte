<script>
	import Map from "./components/Map.svelte";
	import Profiles from "./components/Profiles.svelte";
	import {edit} from './state';

	if(location.hash === '#edit') 
		$edit = true;
	else
		$edit = false;
	
</script>

<Map lat="50.07326" lon="14.41786" zoom="18"/>
<Profiles/>
