<div class="container"></div>

<style>
	.container {
		color: var(--green-foreground);
		background-color: var(--green-background);
		border: 1px solid var(--green-border);
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 9999;
	}

	.container::before {
		content: '[=    ]';
		font-family:
			'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
			'Courier New', monospace;
		white-space: pre;
		display: inline-block;
		animation: asciiSpinner 0.4s steps(1, end) infinite;
	}

	@keyframes asciiSpinner {
		0% {
			content: '[=    ]';
		}
		10% {
			content: '[==   ]';
		}
		20% {
			content: '[ === ]';
		}
		30% {
			content: '[  ===]';
		}
		40% {
			content: '[   ==]';
		}
		50% {
			content: '[    =]';
		}
		60% {
			content: '[   ==]';
		}
		70% {
			content: '[  ===]';
		}
		80% {
			content: '[ === ]';
		}
		90% {
			content: '[==   ]';
		}
		100% {
			content: '[=    ]';
		}
	}
</style>
