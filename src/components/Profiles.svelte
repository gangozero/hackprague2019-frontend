<script>

import { onMount } from 'svelte';
import {callAPI} from './../helpers';
import {category,personal,mode} from './../state';

let listCall = callAPI('profile');

category.subscribe(v=>console.log(v));
personal.subscribe(v=>console.log(v));
mode.subscribe(v=>console.log(v));

/*
onMount(() => {
    callAPI('profile').then((data)=>{
        console.log(data);
    });
});*/

</script>

<style>
#list{
    background-color: white;
    border:1px solid black;
    border-radius: 5px;
    width: 2    00px;
    position: absolute;
    top: 15px;
    right: 15px;
    z-index:100000;
    padding:15px;
}

h3{
    margin:2px;
}

</style>

<div id="list">
    <h3>Type</h3>
    <select bind:value={$personal}>
        <option value={true}>Personal</option>
        <option value={false}>Collective</option>
    </select>


    <select bind:value={$mode}>
        <option value={true}>+1</option>
        <option value={false}>-1</option>
    </select>

    <h3>Category</h3>
    {#await listCall}
        Loading
    {:then list}
        {#each list as item}
            <div><input type="radio" bind:group={$category} value="{item.id}"> - {item.name}</div>
        {/each}
    {/await}
        
</div>