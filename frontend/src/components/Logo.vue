<template>
  <!-- Igual ao portfólio: ícone Code2 em caixa bg-primary/10 + PVS.dev -->
  <div class="flex items-center gap-2">
    <div
      class="flex shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 p-2 transition-colors"
      aria-hidden="true"
    >
      <!-- Ícone Code2 (igual ao favicon do portfólio) em verde -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 text-emerald-400"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <g transform="translate(4, 4)">
          <path d="m18 16 4-4-4-4" />
          <path d="m6 8-4 4 4 4" />
          <path d="m14.5 4-5 16" />
        </g>
      </svg>
    </div>
    <span class="font-display font-bold text-xl tracking-tight text-slate-100">
      PVS<span class="text-emerald-400">.dev</span>
    </span>
  </div>
</template>

<script setup>
</script>
