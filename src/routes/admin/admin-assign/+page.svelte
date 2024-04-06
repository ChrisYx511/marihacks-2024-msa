<script lang="ts">

    let time = new Date();
    
    $: hours = time.getHours();
    $: greet = (hours > 18 || hours < 4) ? "evening" : "morning";
    
    let username:string= "bob";
    let tuteeName:string = "";

    let tutors:number[] = [4, 2, 3, 3, 5, 3, 3, 4];
    
    function pick(){
        hours += 1;
    }
</script>

<h1 lang="ts" class={"text-6xl"}>Good {greet}, {username}</h1>

<div class={"flex"}>
    <div class={"m-auto grid grid-cols-1 gap-4 content-normal"}>
        <h1 class={"text-2xl m-auto"}>Mentee to assign: {tuteeName}</h1>
        <img class={"m-auto"} src={"/profilepicplaceholder.jpg"} alt="tutee pic"/>  
    </div>
</div>
    
<div class={"flex mt-10"}>
    <div class={"m-auto "}>Possible tutors</div>
</div>

<div class={"flex"}>

    <div class={"m-auto grid grid-cols-4 gap-4 max-w-400 content-normal"}>
        
        {#each tutors as tutor}
            
            <button on:click={pick}>
                <img class={"m-auto"} src={"/profilepicplaceholder.jpg"} alt="tutee pic"/>  
            </button>
        {/each}
    </div>
</div>
