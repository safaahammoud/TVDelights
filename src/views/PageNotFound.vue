<template>
    <div>
        <h1>Not Found</h1>

        <h3>This page doesnt exist.</h3>

        <p>
            If this is a mistake, <a :href="contactUsLink">let us know</a>, and we will try to fix it!
        </p>
    </div>
</template>

<script setup lang="ts">
    const contactUsLink = 'https://www.abnamro.nl/en/personal/contact/index.html';
</script>