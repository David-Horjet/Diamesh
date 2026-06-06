Home

# QVAC by Tether: the Infinite Stable Intelligence Platform (/)



import { MessagesSquare, Hash, Languages, Mic, Speech, Volume2, ScanText, Image as ImageIcon, Video, GalleryHorizontal, FlaskConical, ScanSearch, Shapes, Eye, Map, Rocket, Server, MonitorPlay } from 'lucide-react'

## Why QVAC?

QVAC is Tether's answer to centralized AI by ensuring AI is not tied to massive data centers in the hands of a few *but is free to run on everyone's devices, without a central point of failure or arbitrary censorship*.

## Features

<FeaturesInfographic />

## AI capabilities

{/* <Task name>: <what computation is performed> for <what the developer achieves> via <engine> */}

{/* <task>: <tech process> for <use case>, via <engine> */}

<Cards className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  <Card href="/ai-capabilities/text-generation" title={<span className="inline-flex items-center gap-2"><MessagesSquare className="size-4 text-[var(--color-fd-primary)]" />Text generation</span>}>
    LLM inference for text generation and chat via Fabric LLM.
  </Card>

  <Card href="/ai-capabilities/text-embeddings" title={<span className="inline-flex items-center gap-2"><Hash className="size-4 text-[var(--color-fd-primary)]" />Text embeddings</span>}>
    Vector embedding generation for semantic search, clustering, and retrieval, via Fabric LLM.
  </Card>

  <Card href="/ai-capabilities/rag" title={<span className="inline-flex items-center gap-2"><ScanSearch className="size-4 text-[var(--color-fd-primary)]" />RAG</span>}>
    Out-of-the-box retrieval-augmented generation workflow.
  </Card>

  <Card href="/ai-capabilities/fine-tuning" title={<span className="inline-flex items-center gap-2"><FlaskConical className="size-4 text-[var(--color-fd-primary)]" />Fine-tuning</span>}>
    Adapting LLMs to domain-specific tasks via LoRA.
  </Card>

  <Card href="/ai-capabilities/multimodal" title={<span className="inline-flex items-center gap-2"><GalleryHorizontal className="size-4 text-[var(--color-fd-primary)]" />Multimodal</span>}>
    LLM inference over text, images, and other media within a single conversation context.
  </Card>

  <Card href="/ai-capabilities/image-generation" title={<span className="inline-flex items-center gap-2"><ImageIcon className="size-4 text-[var(--color-fd-primary)]" />Image generation</span>}>
    Text-to-image and image-to-image generation via a customized Diffusion backend.
  </Card>

  <Card href="/ai-capabilities/video-generation" title={<span className="inline-flex items-center gap-2"><Video className="size-4 text-[var(--color-fd-primary)]" />Video generation</span>}>
    Text-to-video generation via a customized Diffusion backend.
  </Card>

  <Card href="/ai-capabilities/transcription" title={<span className="inline-flex items-center gap-2"><Speech className="size-4 text-[var(--color-fd-primary)]" />Transcription</span>}>
    Automatic speech recognition (ASR) via a customized Whisper backend or NVIDIA Parakeet.
  </Card>

  <Card href="/ai-capabilities/text-to-speech" title={<span className="inline-flex items-center gap-2"><Volume2 className="size-4 text-[var(--color-fd-primary)]" />Text-to-Speech</span>}>
    Speech synthesis (TTS) via a customized GGML backend.
  </Card>

  <Card href="/ai-capabilities/voice-assistant" title={<span className="inline-flex items-center gap-2"><Mic className="size-4 text-[var(--color-fd-primary)]" />Voice assistant</span>}>
    Real-time voice pipeline: transcription, text generation, and speech synthesis in one loop.
  </Card>

  <Card href="/ai-capabilities/translation" title={<span className="inline-flex items-center gap-2"><Languages className="size-4 text-[var(--color-fd-primary)]" />Translation</span>}>
    Text-to-text neural machine translation (NMT), via Fabric LLM and Bergamot.
  </Card>

  <Card href="/ai-capabilities/vla" title={<span className="inline-flex items-center gap-2"><Eye className="size-4 text-[var(--color-fd-primary)]" />VLA</span>}>
    Vision-language-action for robot control via a customized GGML backend.
  </Card>

  <Card href="/ai-capabilities/ocr" title={<span className="inline-flex items-center gap-2"><ScanText className="size-4 text-[var(--color-fd-primary)]" />OCR</span>}>
    Optical character recognition for extracting text from images via ONNX Runtime.
  </Card>

  <Card href="/ai-capabilities/image-classification" title={<span className="inline-flex items-center gap-2"><Shapes className="size-4 text-[var(--color-fd-primary)]" />Image classification</span>}>
    Classify images into labels with confidence scores via a customized GGML backend.
  </Card>
</Cards>

## System overview

<object type="image/svg+xml" data="/diagrams/system-overview.svg" width={721} height={575} className="mx-auto my-8 block max-w-full h-auto" aria-label="System overview diagram">
  System overview diagram
</object>

*The SDK is the main entry point for using QVAC*. It is type-safe and exposes all QVAC capabilities through a unified interface. It runs on Node.js, [Bare runtime](https://bare.pears.com), and [Expo](https://expo.dev).

Additionally, QVAC provides a CLI with development tools, as well as an HTTP server that wraps QVAC and exposes an [**OpenAI-compatible API**](https://platform.openai.com/docs/api-reference). *By implementing the OpenAI API format, QVAC can integrate with the broader AI ecosystem.*

Finally, QVAC also encompasses desktop and mobile [**flagship applications**](https://qvac.tether.io#products) to empower users and showcase QVAC capabilities, as well as [**research initiatives**](https://huggingface.co/qvac) to advance the state of the art in local AI.

## Next steps

Choose how you want to start with QVAC:

<Cards>
  <Card href="/introduction" icon={<Map className="text-[var(--color-fd-primary)]" />} title="Get started with the SDK">
    Learn the essentials for using the SDK: system requirements, compatibility matrix, setup basics, and core usage flows.
  </Card>

  <Card href="/quickstart" icon={<Rocket className="text-[var(--color-fd-primary)]" />} title="Quickstart">
    Run your first example using the JS/TS SDK. At the end, you'll find instructions to run any example in this documentation.
  </Card>

  <Card href="https://qvac.tether.io/products/workbench/" icon={<MonitorPlay className="text-[var(--color-fd-primary)]" />} title="See QVAC in practice">
    Try QVAC Workbench, our flagship desktop and mobile app built with QVAC.
  </Card>

  <Card href="/cli/http-server" icon={<Server className="text-[var(--color-fd-primary)]" />} title="Integrate an OpenAI-compatible client">
    Run the QVAC HTTP server and connect any existing OpenAI-compatible system to local AI.
  </Card>
</Cards>


Introduction

# Introduction (/introduction)



## Overview

Install the npm package `@qvac/sdk` in your project. Then, load models and use them to perform AI inference locally, or delegate inference to peers using the built-in P2P capability.

{/*
  ## Releases

  - [Latest version: v0.7.0](https://www.npmjs.com/package/@qvac/sdk)
  - [Release notes for this version](https://github.com/tetherto/qvac-sdk/releases/tag/v0.5.0)
  */}

## Description

The JS SDK is cross-platform, type-safe, and pluggable, exposing all QVAC capabilities through a unified interface.

### Key features

* **Cross-platform:** portable code across Linux, macOS, and Windows (Node.js / [Bare runtime](https://bare.pears.com)); Android and iOS ([Expo](https://expo.dev)).
* **Pluggable**: build lean apps by including only what you need, and extend the SDK with custom plugins.
* **Type-safe:** typed JS API.
* **Unified interface:** multiple AI tasks, one single npm package to install in your project.

## Quickstart

<Card href="/quickstart" title="Run your first example using the JS SDK">
  At the end, you’ll find instructions for running all examples in this documentation.
</Card>

## Installation

<Card href="/installation" title="Install and run on Node.js, Bare, or Expo">
  Supported environments and how to install the SDK for each one.
</Card>

## Functionalities

### AI tasks

{/* <Task name>: <what computation is performed> for <what the developer achieves> via <engine> */}

{/* <task>: <tech process> for <use case>, via <engine> */}

* [**Text generation:**](/ai-capabilities/text-generation) LLM inference for text generation and chat via [`qvac-fabric-llm.cpp`](https://github.com/tetherto/qvac-fabric-llm.cpp).
* [**Text embeddings:**](/ai-capabilities/text-embeddings) vector embedding generation for semantic search, clustering, and retrieval, via `qvac-fabric-llm.cpp`.
* [**RAG:**](/ai-capabilities/rag) out-of-the-box retrieval-augmented generation workflow.
* [**Fine-tuning:**](/ai-capabilities/fine-tuning) adapting LLMs to domain-specific tasks via LoRA.
* [**Multimodal:**](/ai-capabilities/multimodal) LLM inference over text, images, and other media within a single conversation context.
* [**Image generation:**](/ai-capabilities/image-generation) text-to-image and image-to-image generation via a customized Diffusion engine.
* [**Video generation:**](/ai-capabilities/video-generation) text-to-video generation via a customized Diffusion engine.
* [**Transcription:**](/ai-capabilities/transcription) automatic speech recognition (ASR) for speech-to-text via a customized Whisper engine or [NVIDIA Parakeet](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v2).
* [**Text-to-Speech:**](/ai-capabilities/text-to-speech) speech synthesis for text-to-speech (TTS) via [a customized GGML backend](https://github.com/tetherto/qvac/tree/main/packages/tts-ggml).
* [**Voice assistant:**](/ai-capabilities/voice-assistant) real-time voice conversation pipeline chaining transcription, text generation, and text-to-speech.
* [**Translation:**](/ai-capabilities/translation) text-to-text neural machine translation (NMT), via `qvac-fabric-llm.cpp` and [Bergamot](https://browser.mt).
* [**VLA:**](/ai-capabilities/vla) vision-language-action that turns camera frames, robot state, and natural-language instruction into action chunks for robot control, via [a customized GGML backend](https://github.com/tetherto/qvac/tree/main/packages/vla-ggml).
* [**OCR:**](/ai-capabilities/ocr) optical character recognition (OCR) for extracting text from images via ONNX runtime.
* [**Image classification:**](/ai-capabilities/image-classification) assigning class labels with confidence scores to images, via [a customized GGML backend](https://github.com/tetherto/qvac/tree/main/packages/classification-ggml).

### P2P capabilities

* [**Delegated inference:**](/p2p-capabilities/delegated-inference) delegate inference to peers via the [Holepunch stack](https://holepunch.to), enabling resource sharing.
* **Fetch models:** download AI models from peers via the distributed model registry.
* [**Blind relays:**](/p2p-capabilities/blind-relays) connect peers across NATs/firewalls by routing traffic through relay nodes.

### Utilities

* [**Logging:**](/runtime/logging) visibility into what's happening  during loading, inference, and other operations.
* [**Profiler:**](/runtime/profiler) measure and export timing metrics across model loading, inference, and P2P delegation.
* [**Download Lifecycle:**](/models/download-lifecycle) pause and resume model downloads.
* [**Runtime lifecycle:**](/runtime/lifecycle) suspend and resume the SDK runtime (e.g., on app background/foreground) and query lifecycle state.
* [**Cancellation:**](/runtime/cancellation) cancel any in-flight inference, model load, or download by `requestId`, or broad-cancel by `modelId` for unload/shutdown.
* [**Sharded models:**](/models/sharded-models) download a model that is sharded into multiple parts.

## Flow

Before you can use a model, you need to load it from some location into memory. Flow for performing AI inference:

1. Call function [`loadModel()`](/reference/api#loadmodel) to initialize the SDK and load one model. You can load multiple models simultaneously calling `loadModel()` again.
2. Perform AI tasks by calling the appropriate functions from SDK API — e.g., `completion()`.
3. When you are done with a model, call [`unloadModel()`](/reference/api#unloadmodel) to release computer resources.
4. Finally, close the SDK instance by calling [`close()`](/reference/api).

## Models

Each [AI task](#ai-tasks) works with different model families, and among the supported ones, you can choose which to use and how to obtain them. `loadModel()` manages the download and caching of models (one or multiple files), and their loading from disk into memory, preparing them for use.

`loadModel()` supports loading models from three different locations:

* Local filesystem, by providing a path.
* HTTP server, by providing an HTTP URL.
* Our distributed model registry.

The SDK package does not ship with built-in models, **but** its API exposes constants representing preconfigured models (e.g., `LLAMA_3_2_1B_INST_Q4_0`). Each constant maps a model already published to our model registry. When calling `loadModel()`, you can provide one of these constants instead of a location, making model retrieval transparent.

<Card href="https://github.com/tetherto/qvac/blob/main/packages/sdk/models/registry/models.ts" title="Model registry index">
  See the index of models available in our distributed model registry.
</Card>

For more on querying the model registry, see [`modelRegistryList()`](/reference/api#modelregistrylist), [`modelRegistrySearch()`](/reference/api#modelregistrysearch), and [`modelRegistryGetModel()`](/reference/api#modelregistrygetmodel).

For more on loading models, see [`loadModel()` at `@qvac/sdk` API reference](/reference/api#loadmodel).

## Configuration

<Card href="/configuration" title="qvac.config.*">
  Use `qvac.config.*` to configure QVAC's overall behavior.
</Card>

### Plugin system

<Cards className="grid-cols-1">
  <Card href="/configuration/plugins" title="Built-in and custom plugins">
    Enable and disable built-in AI capabilities, and add new ones via custom plugins.
  </Card>

  <Card href="/configuration/plugins/write-custom-plugin" title="Write a custom plugin">
    Guidelines to ship your custom plugin as a single npm package.
  </Card>
</Cards>

## JS API

<Card href="/reference/api" title="API reference">
  `@qvac/sdk` npm package exposes a function-centric, typed JS API.
</Card>

## How it works

<Card href="/about/how-it-works" title="How it works">
  Understand what happens under the hood when you use QVAC SDK in your application
</Card>

## Other resources

* [SDK landing page](https://qvac.tether.io/dev/sdk/)
* [Package at npm](https://www.npmjs.com/package/@qvac/sdk)


Quickstart

# Quickstart (/quickstart)



import { TrackCopy } from '@/components/track-copy'

## Requirements

* Node.js $\geq$ v22.17
* npm $\geq$ v10.9

## Step-by-step

<Steps>
  <Step>
    Create the examples workspace:

    ```bash
    mkdir qvac-examples
    cd qvac-examples
    npm init -y && npm pkg set type=module
    ```
  </Step>

  <Step>
    Install the SDK:

    <TrackCopy name="npm_install">
      ```bash
      npm i @qvac/sdk
      ```
    </TrackCopy>
  </Step>

  <Step>
    Create the quickstart script:

    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/quickstart.js title="quickstart.js" lineNumbers
      import { loadModel, LLAMA_3_2_1B_INST_Q4_0, completion, unloadModel, } from "@qvac/sdk";
      try {
          // Load a model into memory
          const modelId = await loadModel({
              modelSrc: LLAMA_3_2_1B_INST_Q4_0,
              onProgress: (progress) => {
                  console.log(progress);
              },
          });
          // You can use the loaded model multiple times
          const history = [
              {
                  role: "user",
                  content: "Explain quantum computing in one sentence",
              },
          ];
          const result = completion({ modelId, history, stream: true });
          for await (const token of result.tokenStream) {
              process.stdout.write(token);
          }
          // Unload model to free up system resources
          await unloadModel({ modelId });
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Step>

  <Step>
    Run the quickstart script with Node.js:

    ```bash
    node quickstart.js
    ```

    Or with the [Bare](https://bare.pears.com) runtime (same script; the SDK installs a Node-compatible `process` global on Bare so `process.stdout` and `process.exit` work without importing `bare-process` in your own file):

    ```bash
    bare quickstart.js
    ```

    You still need Bare and the SDK’s **Bare peer dependencies** (including `bare-process` and the other `bare-*` packages listed for `@qvac/sdk`) installed in the project. Recent npm versions resolve peers when you run `npm i @qvac/sdk`; if resolution fails, install the peers your package manager reports as missing.
  </Step>
</Steps>

## Running examples

Follow these instructions to run any example in this documentation:

* All examples are self-contained, runnable JavaScript scripts. Use the `qvac-examples` workspace created in this quickstart to store and run them as you explore this documentation.
* Run each example with the indicated compatible JavaScript environment. QVAC supports multiple environments (Node.js, Bare, and Expo). After you `import` from `@qvac/sdk`, Bare has a `process` global (via `bare-process`) for typical CLI patterns; some examples still use other Node-specific APIs (e.g. `fs` without Bare shims) and note their compatible environment.
* Some examples also provide a TypeScript version. If you want to run TS directly, install the required dev dependencies:
  ```bash
  npm i -D tsx typescript
  ```


System requirements

# System requirements (/system-requirements)



## Overview

Minimum host requirements for running `@qvac/sdk` and `@qvac/cli`. You can validate your environment against this list with:

```bash
qvac doctor
```

Use `--json` for machine-readable output and `--quiet` to set the exit code only (`0` when all required checks pass, `1` otherwise).

## Scope

The `qvac` CLI itself runs on desktops only. The SDK additionally targets Android and iOS via Expo/BareKit; those appear here as **deploy targets** with host-toolchain checks (`adb`, `xcodebuild`) but never cause a non-zero exit.

## Required

| Requirement                                 | Notes                                                                                                                               |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Node.js `>= 18.0.0`                         | Node 18 is end-of-life; prefer `>= 20`. Matches `engines.node` of `@qvac/cli`.                                                      |
| Supported CLI host                          | `darwin-arm64`, `darwin-x64`, `linux-arm64`, `linux-x64`, `win32-x64`. The CLI cannot run on mobile; those are deploy targets only. |
| Total RAM `>= 2 GB` (recommended `>= 4 GB`) | Below 4 GB, most LLMs will fail to load.                                                                                            |

## Recommended

| Requirement                                                | When it is needed                                                                                                                                                                      |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Available RAM `>= 2 GB`                                    | Needed when loading a model. Checked via `os.availableMemory()` on Node 22+, falling back to `os.freemem()` on older Nodes.                                                            |
| GPU acceleration (Metal on macOS, Vulkan on Linux/Windows) | QVAC inference backends use Metal (always present on macOS) or Vulkan on Linux/Windows. Without a Vulkan ICD, LLM and Whisper inference fall back to CPU and are significantly slower. |
| Free disk `>= 5 GB` in the working directory               | Model artifacts are typically multi-GB per model. Uses `fs.statfsSync` (Node 18.15+) with a POSIX `df` fallback.                                                                       |

## Deploy targets

These checks are informational. They never cause `qvac doctor` to exit non-zero, because cross-bundling is always supported via bare-pack prebuilt binaries. What is checked here is the host toolchain needed to install/deploy to each target class.

| Target                                                 | Check                                                        | Status when missing                                                                                                          |
| ------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `darwin-{arm64,x64}`, `linux-{arm64,x64}`, `win32-x64` | Listed under "Desktop"; native host flagged with `(native)`. | Always `pass` — cross-bundling is built in.                                                                                  |
| `android-arm64`                                        | `adb --version`                                              | `warn` — install [Android platform tools](https://developer.android.com/tools/releases/platform-tools) to deploy to devices. |
| `ios-arm64` + simulators                               | `xcodebuild -version` (macOS only)                           | `warn` on macOS without Xcode, `info` on non-macOS hosts.                                                                    |

## Optional tools

Only required if you use the corresponding feature. The checker warns when they are missing but does not fail.

| Tool                                   | Required for                                                                                                                             |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `ffmpeg`                               | Microphone capture, transcription examples, and the built-in audio decoder. Install from [ffmpeg.org](https://ffmpeg.org/download.html). |
| [Bare](https://bare.pears.com) runtime | Running the SDK under Bare directly.                                                                                                     |
| [Bun](https://bun.sh)                  | Building the SDK from source or running the monorepo development workflow.                                                               |

## Project

| Check                               | Notes                                                                                                                                                                |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@qvac/sdk` resolvable from project | Resolved with `require.resolve('@qvac/sdk/package.json')` rooted at the working directory; hoisted installs (monorepos, Yarn/Bun workspaces) are correctly detected. |

## Exit codes

* `0` — all required checks passed. Warnings, skips, and informational rows may still be present.
* `1` — one or more required checks failed (unsupported Node version, unsupported CLI host, insufficient total RAM, ...). See the printed hints for remediation steps.

## JSON schema

```ts
interface DoctorReport {
  ok: boolean;
  platform: string;       // e.g. "darwin"
  arch: string;           // e.g. "arm64"
  nodeVersion: string;    // e.g. "20.19.5"
  sections: Array<{
    id: 'runtime' | 'hardware' | 'targets' | 'tools' | 'project';
    title: string;
    checks: Array<{
      id: string;
      label: string;
      status: 'pass' | 'warn' | 'fail' | 'skip' | 'info';
      severity: 'required' | 'recommended' | 'informational';
      value?: string;
      detail?: string;
      hint?: string;
    }>;
  }>;
}
```

### Status semantics

* `pass` — check ran and the requirement is satisfied.
* `warn` — recommended requirement not met, or a deploy-target toolchain is missing; does not cause a non-zero exit.
* `fail` — required check not met; causes exit code `1`.
* `skip` — the check could not be executed on this host (missing Node API and no fallback, etc.).
* `info` — informational row with no pass/fail judgment (e.g. iOS deploy target on a non-macOS host).


Installation:

# Installation (/installation)



import { TrackCopy } from '@/components/track-copy'

## Supported environments

QVAC SDK is distributed as the npm package `@qvac/sdk` for JavaScript/TypeScript projects.

### JS environments

* Node.js $\geq$ v22.17
* [Bare](https://bare.pears.com) $\geq$ v1.24
* [Expo](https://expo.dev) $\geq$ v54

### Compatibility matrix

| Platform | Min Version | Architecture | GPU API/Backend              | Notes                                                                       |
| -------- | ----------- | ------------ | ---------------------------- | --------------------------------------------------------------------------- |
| macOS    | 14.0+       | arm64        | Metal                        | Arch x64 supports CPU inference only; Intel iGPU acceleration not supported |
| iOS      | 17.0+       | arm64        | Metal                        | Requires Expo                                                               |
| Linux    | Ubuntu 22+  | arm64, x64   | Vulkan                       | Vulkan runtime required                                                     |
| Android  | 12+         | arm64        | Vulkan, OpenCL (Adreno 700+) | Requires Expo                                                               |
| Windows  | 10+         | x64          | Vulkan                       | Vulkan-capable GPU + vendor drivers required                                |

## Installation

<TrackCopy name="npm_install">
  ```bash
  npm i @qvac/sdk
  ```
</TrackCopy>

### Linux

Requirements:

* Ubuntu 22 requires [g++](https://github.com/gcc-mirror/gcc) $\geq$ 13.
* Vulkan runtime: Vulkan loader + a GPU driver with Vulkan support

On desktop Linux distributions (e.g., Ubuntu Desktop), these requirements are typically satisfied out of the box.

<Callout type="info">
  On PCs, the Vulkan runtime is usually installed along with the GPU drivers. In other words, *if you've installed the correct driver for your GPU (with Vulkan support), you typically don't need to install anything else.*
</Callout>

To verify it, install Vulkan tools and run `vulkaninfo`:

<Tabs>
  <Tab value="debian" label="Debian/Ubuntu" default>
    ```bash
    sudo apt update
    sudo apt install -y vulkan-tools
    vulkaninfo --summary
    ```
  </Tab>

  <Tab value="fedora" label="Fedora/RHEL">
    ```bash
    sudo dnf install -y vulkan-tools vulkan-devel
    vulkaninfo --summary
    ```
  </Tab>
</Tabs>

In minimalist/headless installations (e.g., Ubuntu Server), you may need to manually install the Vulkan loader, and ensure a Vulkan-capable GPU driver (ICD) is installed. The exact packages vary by distro and GPU vendor. For example:

<Tabs>
  <Tab value="debian" label="Debian/Ubuntu (Intel/AMD via Mesa)" default>
    ```bash
    sudo apt update
    sudo apt install -y libvulkan1 mesa-vulkan-drivers
    vulkaninfo --summary
    ```
  </Tab>

  <Tab value="fedora" label="Fedora">
    ```bash
    sudo dnf install -y vulkan-loader mesa-vulkan-drivers
    vulkaninfo --summary
    ```
  </Tab>
</Tabs>

Ensure QVAC can detect the GPU Vulkan driver by adding your user to the `render` and `video` groups:

```bash
sudo usermod -aG render,video $USER
```

### Expo

<Steps>
  <Step>
    Install peer dependencies:

    ```bash
    npm i 'react-native-bare-kit@^0.11.5'
    npm i -D 'bare-pack@^1.5.1'
    npx expo install expo-file-system expo-build-properties expo-device
    ```

    <Callout type="success">
      **Tip:** use `npx expo install` for all `expo-*` packages to ensure compatibility with your project's Expo SDK version.
    </Callout>
  </Step>

  <Step>
    Configure `expo-build-properties` and add `@qvac/sdk/expo-plugin` to the `plugins` array in your `app.json`:

    ```json title="app.json"
    {
      "expo": {
        "plugins": [
          ["expo-build-properties", { // [!code ++]
            "android": { "minSdkVersion": 29 } // [!code ++]
          }], // [!code ++]
          "@qvac/sdk/expo-plugin" // [!code ++]
        ]
      }
    }
    ```
  </Step>

  <Step>
    Prebuild your project to generate the native files:

    ```bash
    npx expo prebuild
    ```
  </Step>

  <Step>
    Build and run it on a **physical device**:

    ```bash
    npx expo run:ios --device
    # or
    npx expo run:android --device
    ```
  </Step>
</Steps>

<Callout type="info">
  Due to limitations with `llamacpp`, QVAC currently does not run on emulators.
  You **must** use a physical device.
</Callout>

### Windows

Requirement:

* Vulkan runtime: Vulkan loader + a GPU driver with Vulkan support

This requirement is typically satisfied out of the box after installing the correct GPU vendor drivers. To verify it, [install Vulkan SDK](https://vulkan.lunarg.com) and run:

```powershell
vulkaninfo --summary
```

configuration

# Configuration (/configuration)



## Overview

QVAC configuration is loaded once during initialization from `qvac.config.*` file — `qvac.config.json`, `qvac.config.js`, or `qvac.config.ts` — and remains immutable for the lifetime of the SDK instance. To provide configuration, either set the `QVAC_CONFIG_PATH` environment variable or place a `qvac.config.*` file at the root of your project.

When using only the SDK, providing a configuration is **not required**. If you do not provide one, the SDK uses the default settings. *When using the HTTP server, however, providing a configuration **is required**.*

## Examples

Below are examples of `qvac.config.*` files. Values marked with `<placeholders>` should be replaced with your actual values.

<Tabs>
  <Tab value="json" label="JSON" default>
    <WrapCode>
      ```json title="qvac.config.json" lineNumbers
      {
        "plugins": ["<builtin_plugin_1>", "<custom_plugin_2>"],
        "loggerConsoleOutput": true,
        "loggerLevel": "info",
        "swarmRelays": ["<hyperbee_key_1>", "<hyperbee_key_2>"],
        "cacheDirectory": "</absolute/path/to/.qvac/models>",
        "httpDownloadConcurrency": 3,
        "httpConnectionTimeoutMs": 10000,
        "registryDownloadMaxRetries": 3,
        "registryStreamTimeoutMs": 60000,
        "deviceDefaults": [
          {
            "name": "Samsung Galaxy force CPU",
            "match": { "platform": "android", "deviceBrand": "samsung" },
            "defaults": { "llm": { "device": "cpu" } }
          }
        ],
        "bareRuntimeVersion": "<x.y.z>",
        "serve": {
          "models": {
            "<model_alias>": {
              "model": "<SDK_MODEL_CONSTANT>",
              "default": true,
              "preload": true,
              "config": {}
            }
          }
        }
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="js" label="JavaScript">
    <WrapCode>
      ```js title="qvac.config.js" lineNumbers
      module.exports = {
        plugins: ["<builtin_plugin_1>", "<custom_plugin_2>"],
        loggerConsoleOutput: true,
        loggerLevel: "info",
        swarmRelays: ["<hyperbee_key_1>", "<hyperbee_key_2>"],
        cacheDirectory: "</absolute/path/to/.qvac/models>",
        httpDownloadConcurrency: 3,
        httpConnectionTimeoutMs: 10000,
        registryDownloadMaxRetries: 3,
        registryStreamTimeoutMs: 60000,
        deviceDefaults: [
          {
            name: "Samsung Galaxy force CPU",
            match: { platform: "android", deviceBrand: "samsung" },
            defaults: { llm: { device: "cpu" } },
          },
        ],
        bareRuntimeVersion: "<x.y.z>",
        serve: {
          models: {
            "<model_alias>": {
              model: "<SDK_MODEL_CONSTANT>",
              default: true,
              preload: true,
              config: {},
            },
          },
        },
      };
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts title="qvac.config.ts" lineNumbers
      import type { QvacConfig } from "@qvac/sdk";

      const config: QvacConfig = {
        plugins: ["<builtin_plugin_1>", "<custom_plugin_2>"],
        loggerConsoleOutput: true,
        loggerLevel: "info",
        swarmRelays: ["<hyperbee_key_1>", "<hyperbee_key_2>"],
        cacheDirectory: "</absolute/path/to/.qvac/models>",
        httpDownloadConcurrency: 3,
        httpConnectionTimeoutMs: 10000,
        registryDownloadMaxRetries: 3,
        registryStreamTimeoutMs: 60000,
        deviceDefaults: [
          {
            name: "Samsung Galaxy force CPU",
            match: { platform: "android", deviceBrand: "samsung" },
            defaults: { llm: { device: "cpu" } },
          },
        ],
        bareRuntimeVersion: "<x.y.z>",
        serve: {
          models: {
            "<model_alias>": {
              model: "<SDK_MODEL_CONSTANT>",
              default: true,
              preload: true,
              config: {},
            },
          },
        },
      };

      export default config;
      ```
    </WrapCode>
  </Tab>
</Tabs>

## Options

The following table lists all supported configuration options for `qvac.config.*`:

| Option                              | Description                                                                                                                                                                                                          | Type                                     | Required | Default                                                 |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | -------- | ------------------------------------------------------- |
| [`plugins`](/configuration/plugins) | Plugin specifiers to bundle (built-in and/or custom).                                                                                                                                                                | `string[]`                               | No       | [All built-in plugins](/configuration/plugins#built-in) |
| `loggerConsoleOutput`               | Enable or disable console output for SDK loggers.                                                                                                                                                                    | `boolean`                                | No       | `true`                                                  |
| `loggerLevel`                       | Global log level for all SDK loggers.                                                                                                                                                                                | `"error" \| "warn" \| "info" \| "debug"` | No       | `"info"`                                                |
| `swarmRelays`                       | Hyperswarm relay public keys (hex strings) for improved P2P connectivity (blind relays).                                                                                                                             | `string[]`                               | No       | —                                                       |
| `cacheDirectory`                    | Absolute path to the directory where models and other cached assets are stored.                                                                                                                                      | `string`                                 | No       | `~/.qvac/models`                                        |
| `httpDownloadConcurrency`           | Maximum number of concurrent HTTP downloads for sharded models.                                                                                                                                                      | `number`                                 | No       | `3`                                                     |
| `httpConnectionTimeoutMs`           | Timeout in milliseconds for HTTP connection establishment (applies to HEAD and GET requests).                                                                                                                        | `number`                                 | No       | `10000`                                                 |
| `registryDownloadMaxRetries`        | Maximum retry attempts for registry (P2P) downloads on timeout.                                                                                                                                                      | `number`                                 | No       | `3`                                                     |
| `registryStreamTimeoutMs`           | Timeout in milliseconds for stalled registry (P2P) download streams. Raise on slow or high-latency connections where the default triggers spurious retries.                                                          | `number`                                 | No       | `60000`                                                 |
| `deviceDefaults`                    | Override loaded model config for specific devices. First matching pattern wins. Use it to optimize for different hardware.                                                                                           | [`DevicePattern[]`](#devicepattern)      | No       | —                                                       |
| `bareRuntimeVersion`                | Bare runtime version used for native addon ABI verification during bundling (`qvac bundle sdk` / `qvac verify bundle`). When omitted, the bundler auto-detects it from `node_modules` (`bare-runtime`, then `bare`). | `string`                                 | No       | Auto-detected                                           |
| `serve`                             | Configuration for the [HTTP server](/cli/http-server).                                                                                                                                                               | [`ServeConfig`](#serveconfig)            | No       | —                                                       |

### `DevicePattern`

| Field      | Description                                                 | Type                                            | Required |
| ---------- | ----------------------------------------------------------- | ----------------------------------------------- | -------- |
| `name`     | Human-readable label for this pattern (used in logs).       | `string`                                        | Yes      |
| `match`    | Which device(s) to target. All specified fields must match. | [`DeviceMatch`](#devicematch)                   | Yes      |
| `defaults` | Model config overrides to apply when matched.               | [`DeviceConfigDefaults`](#deviceconfigdefaults) | Yes      |

#### `DeviceMatch`

| Field                 | Description                                                                                    | Type                 | Required |
| --------------------- | ---------------------------------------------------------------------------------------------- | -------------------- | -------- |
| `platform`            | Target platform.                                                                               | `"android" \| "ios"` | Yes      |
| `deviceBrand`         | Case-insensitive exact brand (e.g., `"samsung"`, `"google"`).                                  | `string`             | No       |
| `deviceModelPrefix`   | Case-sensitive prefix match on the device model (e.g., `"Pixel 10"` matches `"Pixel 10 Pro"`). | `string`             | No       |
| `deviceModelContains` | Substring match on the device model (e.g., `"Galaxy"` matches `"Samsung Galaxy S25"`).         | `string`             | No       |

#### `DeviceConfigDefaults`

Maps each model-type key to a model config object. For example (inside `DevicePattern.defaults`):

```json
{
  "llm": { "device": "cpu", "ctx_size": 1024 },
  "embeddings": { "device": "cpu", "flashAttention": "off" }
}
```

Model types (allowed keys): `llm` | `embeddings` | `whisper` | `parakeet` | `nmt` | `tts` | `ocr`

<Callout type="info">
  **Important:** for the exact config fields supported by each model type (key), see [`modelConfig` — `loadModel()` at `@qvac/sdk` API reference](/reference/api#loadmodel).
</Callout>

### `ServeConfig`

| Field           | Description                                                                                                                                                                                                | Type                                   | Required | Default |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------- | ------- |
| `models`        | Map of model aliases to model entries (see [`ModelEntry`](#modelentry) below). Required when running the server.                                                                                           | `Record<string, string \| ModelEntry>` | Yes      | —       |
| `publicBaseUrl` | Externally reachable origin (e.g., `"https://api.example.com"`). Required for image `response_format=url`. Must start with `http://` or `https://`. The CLI flag `--public-base-url` overrides this value. | `string`                               | No       | —       |
| `openai`        | OpenAI-adapter–specific options. See [`OpenAIOptions`](#openaioptions).                                                                                                                                    | `OpenAIOptions`                        | No       | —       |

#### `ModelEntry`

The `serve.models` field is a map of model aliases to model entries. Keys are the **model aliases** — the names that HTTP clients use in the `model` field of their requests. Values can be either a **string** (SDK model constant name, e.g., `"QWEN3_600M_INST_Q4"`) or a `ModelEntry` object:

| Field     | Description                                                                                                                               | Type      | Required                                               |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------ |
| `model`   | SDK model constant name.                                                                                                                  | `string`  | Yes (unless using `src` + `type`)                      |
| `src`     | Explicit model source (URL or path).                                                                                                      | `string`  | Yes (if no `model`)                                    |
| `type`    | Model type: `llm` \| `embeddings` \| `whisper` \| `parakeet` \| `nmt` \| `tts` \| `ocr` \| `whispercpp-audio-translation` \| `diffusion`. | `string`  | Yes (if using `src`)                                   |
| `default` | Use as the default model for its endpoint category.                                                                                       | `boolean` | No (`false`)                                           |
| `preload` | Load model into memory on server startup.                                                                                                 | `boolean` | No (`true` for constant entries, `false` for explicit) |
| `config`  | Model config overrides (same as [`modelConfig` in `loadModel()`](/reference/api#loadmodel)).                                              | `object`  | No                                                     |

Example:

```json
{
  "serve": {
    "models": {
      "my-llm": {
        "model": "QWEN3_600M_INST_Q4",
        "default": true,
        "preload": true,
        "config": { "ctx_size": 8192 }
      },
      "my-embed": "GTE_LARGE_FP16"
    }
  }
}
```

#### `OpenAIOptions`

Optional OpenAI-adapter settings. Currently only `audio.speech` is configurable:

| Field                        | Description                                                                                                                                                                                                                                    | Type                     | Required | Default   |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------- | --------- |
| `audio.speech.defaultVoice`  | Voice id used by `/v1/audio/speech` when the request omits `voice`. Set to `null` to make `voice` strictly required (otherwise the route returns `400 missing_voice`).                                                                         | `string \| null`         | No       | `"alloy"` |
| `audio.speech.voices`        | Map from OpenAI `voice` strings to `serve.models` aliases (case-insensitive keys). Lets clients keep using OpenAI voice names while the server routes them to QVAC TTS aliases. See [HTTP server — `POST /v1/audio/speech`](/cli/http-server). | `Record<string, string>` | No       | —         |
| `audio.speech.maxInputChars` | Hard cap on the `input` length (characters) accepted by `/v1/audio/speech`. Set to `null` to disable. Matches OpenAI's documented limit and bounds memory usage since the route buffers the full WAV before responding.                        | `number \| null`         | No       | `4096`    |

Example:

```json
{
  "serve": {
    "publicBaseUrl": "https://api.example.com",
    "openai": {
      "audio": {
        "speech": {
          "defaultVoice": "alloy",
          "voices": {
            "alloy": "tts-chatter-alloy",
            "echo": "tts-chatter-echo"
          },
          "maxInputChars": 4096
        }
      }
    }
  }
}
```


Plugin Sysytem

# Plugin system (/configuration/plugins)



## Overview

Each QVAC AI capability maps to a **built-in plugin** in the SDK. This lets you enable only what you need for your project and reduce your application's final bundle size.

In addition, you can add **custom plugins** — both your own and community ones — that extend QVAC's capabilities. In both cases, you'll use the QVAC configuration file and then bundle either with [QVAC CLI](/cli) or [programmatically via `@qvac/sdk/commands`](#notes).

## Built-in plugins

### Catalog

All the built-in plugins you can select, along with the AI tasks that depend on each one:

| Plugin                             | Use in `qvac.config.*`                      | AI tasks that require it                                                                                                                                                  |
| ---------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LLM                                | `@qvac/sdk/llamacpp-completion/plugin`      | [Text generation](/ai-capabilities/text-generation); [multimodal](/ai-capabilities/multimodal); [RAG](/ai-capabilities/rag) ; [Fine-tuning](/ai-capabilities/fine-tuning) |
| Embeddings                         | `@qvac/sdk/llamacpp-embedding/plugin`       | [Text embeddings](/ai-capabilities/text-embeddings); [RAG](/ai-capabilities/rag)                                                                                          |
| ASR with customized Whisper engine | `@qvac/sdk/whispercpp-transcription/plugin` | [Transcription](/ai-capabilities/transcription)                                                                                                                           |
| ASR with Parakeet                  | `@qvac/sdk/parakeet-transcription/plugin`   | [Transcription](/ai-capabilities/transcription)                                                                                                                           |
| NMT                                | `@qvac/sdk/nmtcpp-translation/plugin`       | [Translation](/ai-capabilities/translation)                                                                                                                               |
| TTS                                | `@qvac/sdk/onnx-tts/plugin`                 | [Text-to-Speech](/ai-capabilities/text-to-speech)                                                                                                                         |
| OCR                                | `@qvac/sdk/onnx-ocr/plugin`                 | [OCR](/ai-capabilities/ocr)                                                                                                                                               |
| Diffusion                          | `@qvac/sdk/sdcpp-generation/plugin`         | [Image generation](/ai-capabilities/image-generation)                                                                                                                     |

### Enabling

<Steps>
  <Step>
    [In your `qvac.config.*`, add the built-in plugins you’ll need in your project](/configuration). For example:

    ```json title="qvac.config.json"
    {
      "plugins": [
        "@qvac/sdk/llamacpp-completion/plugin",
        "@qvac/sdk/onnx-ocr/plugin"
      ]
    }
    ```
  </Step>

  <Step>
    <Tabs>
      <Tab value="desktop" label="Node.js/Bare" default>
        When developing for desktop environment, use the QVAC CLI to (re)bundle the SDK only with the selected plugins:

        ```bash
        qvac bundle sdk
        ```
      </Tab>

      <Tab value="mobile" label="Expo">
        [When developing for mobile environment, use the Expo CLI to prebuild your project only with the selected plugins:](/installation/#expo)

        ```bash
        npx expo prebuild
        ```
      </Tab>
    </Tabs>
  </Step>
</Steps>

Only the selected plugins are included in your bundle, significantly reducing your application size. If `plugins` is omitted or an empty array, it bundles all built-in plugins by default.

<Callout type="success">
  **Tips:**

  * You **do not need** the CLI (`@qvac/cli`) to bundle the SDK. See [Notes](#notes) to learn how to do it programmatically via `@qvac/sdk/commands`.
  * See [QVAC CLI](/cli) to learn how to install and use it.
</Callout>

## Custom plugins

Custom plugins are consumed as npm packages. Install the package, enable it in your `qvac.config.*` file like any built-in plugin, then import and use its API alongside the SDK's regular API.

### Enabling

<Steps>
  <Step>
    Install the plugin package in your project. For example:

    ```bash
    npm i qvac-echo-plugin
    ```
  </Step>

  <Step>
    [In your `qvac.config.*`, add its `<package_name>/plugin` specifier alongside any built-in plugins](/configuration). For example:

    ```json title="qvac.config.json"
    {
      "plugins": [
        "@qvac/sdk/llamacpp-completion/plugin",
        "qvac-echo-plugin/plugin" // [!code highlight]
      ]
    }
    ```
  </Step>

  <Step>
    <Tabs>
      <Tab value="desktop" label="Node.js/Bare" default>
        When developing for desktop environment, use the SDK CLI to (re)bundle the SDK with all listed plugins:

        ```bash
        qvac bundle sdk
        ```
      </Tab>

      <Tab value="mobile" label="Expo">
        [When developing for mobile environment, use the Expo CLI to prebuild your project with all listed plugins:](/installation/#expo)

        ```bash
        npx expo prebuild
        ```
      </Tab>
    </Tabs>
  </Step>
</Steps>

<Callout type="success">
  **Tip:** when adding one or more custom plugins, you **must** also add **all** the built-in plugins you will need to use.
</Callout>

### Usage

Custom plugins are consumed as npm packages. Install the package, enable it in your `qvac.config.*` file like any built-in plugin, then import and use its API alongside the SDK’s regular API.

```ts
import { loadModel, unloadModel } from "@qvac/sdk";

// 1. Import the API you need from the custom plugin package:
import { echo, echoStream } from "qvac-echo-plugin";

// 2. Load the model(s) required by the custom plugin:
const modelId = await loadModel({
  modelSrc: "/path/to/echo-model.bin",
  modelType: "echo",
});

// 3. Call functions exposed by the custom plugin API:
const result = await echo({ modelId, message: "Hello, plugin system!" });
console.log(result);

for await (const char of echoStream({ modelId, message: "Streaming test!" })) {
  process.stdout.write(char);
}

await unloadModel({ modelId });
```

## Notes

* In `qvac.config.*`, if `plugins` is omitted or set to an empty array, the SDK bundles all built-in plugins. If `plugins` is set, it bundles only the listed plugins.
* [Each plugin maps to one QVAC addon](https://github.com/tetherto/qvac/tree/main/packages).
* [Write a custom plugin](/configuration/plugins/write-custom-plugin).
* **Programmatic bundling:** you can also prepare and validate the SDK bundle programmatically via API from a Node script. For example:

```ts
import { bundleSdk, verifyBundle } from "@qvac/sdk/commands";

await bundleSdk({
  projectRoot: process.cwd(),
  configPath: "./qvac.config.json",
  quiet: true,
});

const result = await verifyBundle({
  projectRoot: process.cwd(),
  addonsSource: "./qvac/worker.bundle.js",
  hosts: ["android-arm64", "ios-arm64"],
});
```


Write a custom plugin

# Write a custom plugin (/configuration/plugins/write-custom-plugin)



import { File, Folder, Files } from "fumadocs-ui/components/files";

## Entrypoints

Your package must expose two entrypoints:

* `.`: client-side wrappers (Metro-safe, cross-platform)
* `./plugin`: worker-side plugin definition (Bare-only; addon imports allowed)

Example:

```json title="package.json"
{
  "name": "qvac-echo-plugin",
  "exports": {
    ".": {
      "types": "./dist/client.d.ts",
      "import": "./dist/client.js"
    },
    "./plugin": {
      "types": "./dist/plugin.d.ts",
      "import": "./dist/plugin.js"
    }
  }
}
```

## Project structure

Keep client and plugin code split:

<Files>
  <Folder name="qvac-echo-plugin" defaultOpen>
    <File name="package.json" />

    <Folder name="src" defaultOpen>
      <Folder name="client" defaultOpen>
        <File name="index.ts" />
      </Folder>

      <Folder name="plugin" defaultOpen>
        <File name="index.ts" />
      </Folder>
    </Folder>

    <Folder name="dist" defaultOpen>
      <Folder name="client" defaultOpen>
        <File name="index.js" />
      </Folder>

      <Folder name="plugin" defaultOpen>
        <File name="index.js" />
      </Folder>
    </Folder>
  </Folder>
</Files>

## Bare and bundling constraints

Write plugin code that can be statically bundled. Guidelines:

* Avoid Node-only standard library usage in worker/plugin code.
* Avoid dynamic imports in worker/plugin code.
* Keep worker/plugin imports static and predictable.

## Handler payload rules

Keep all handler I/O JSON-serializable. Guidelines:

* Request payloads must be plain JSON.
* Response payloads must be plain JSON.
* Avoid classes, Dates, Buffers, Maps/Sets, functions, and non-serializable types.

## Client wrappers

Expose a wrapper-first API. Do not ask consumers to call `invokePlugin` directly. Guidelines:

* Export all public functions from the package root (`.`).
* Keep wrapper code Metro-safe.
* Forward calls to the worker using `invokePlugin` / `invokePluginStream`.
* Use typed request/response payloads.
* Prefer an options object signature (for example `{ modelId, ...params }`) for consistency with SDK usage.

Example:

```ts title="src/client/index.ts"
import { invokePlugin, invokePluginStream } from "@qvac/sdk";

export async function echo(options: { modelId: string; message: string }) {
  return invokePlugin<{ echoed: string; timestamp: number }>({
    modelId: options.modelId,
    handler: "echo",
    params: options,
  });
}

export async function* echoStream(options: { modelId: string; message: string }) {
  for await (const chunk of invokePluginStream<{ char: string | null; done: boolean }>({
    modelId: options.modelId,
    handler: "echoStream",
    params: options,
  })) {
    if (!chunk.done && chunk.char) {
      yield chunk.char;
    }
  }
}
```

## Worker-side plugin definition

Implement the worker-side plugin in the `./plugin` entrypoint. Guidelines:

* Define the plugin with `definePlugin` and handlers with `defineHandler`.
* Use a unique `modelType`.
* Set a human-readable `displayName`.
* Set `addonPackage` if your plugin uses an addon (use `"none"` for pure JS plugins).
* Implement `createModel(params)` using `params.modelPath` when your plugin requires model files.

Example:

```ts title="src/plugin/index.ts"
import { z } from "zod";
import { definePlugin, defineHandler } from "@qvac/sdk/plugin-utils";
import type { CreateModelParams, PluginModelResult } from "@qvac/sdk";

export const echoPlugin = definePlugin({
  modelType: "echo",
  displayName: "Echo Plugin",
  addonPackage: "none",
  loadConfigSchema: z.object({}).catchall(z.unknown()),

  createModel: (params: CreateModelParams): PluginModelResult => {
    const model = { id: params.modelId, load: async () => {} };
    return { model };
  },

  handlers: {
    echo: defineHandler({
      requestSchema: z.object({ message: z.string() }),
      responseSchema: z.object({ echoed: z.string(), timestamp: z.number() }),
      handler: async (request) => ({
        echoed: `Echo: ${request.message}`,
        timestamp: Date.now(),
      }),
    }),
  },
});
```

## Local development (workspace linking)

Use workspace linking during development:

```bash
# In the plugin directory
bun link

# In the SDK/app project
bun link qvac-echo-plugin
```

Then reference the plugin by package name.

## Publishing checklist

* Package exports `.` and `./plugin`.
* Root entrypoint exports only Metro-safe client wrappers.
* `./plugin` exports the worker-side plugin definition.
* If your plugin requires model files, `createModel` consumes a resolved `modelPath`.
* Handler requests and responses are JSON-serializable.
* Worker/plugin code is Bare-compatible and statically importable.


CLI

# CLI (/cli)



## Overview

QVAC CLI is provided through the `@qvac/cli` npm package. The CLI is installed globally so the `qvac` command is available on your `PATH`. At the moment, it provides the following functionality:

* OpenAI-compatible HTTP server
* SDK bundling
* System requirements check

## Usage

<Steps>
  <Step>
    Install the CLI globally so the `qvac` command is available on your `PATH`:

    ```bash
    npm install -g @qvac/cli
    ```
  </Step>

  <Step>
    Create a `qvac.config.*` file in the root of your project and add the configuration required for the functionality you want to use. See [Configuration](/configuration) to learn how to do this.
  </Step>

  <Step>
    Run a command:

    ```bash
    qvac --help
    ```
  </Step>
</Steps>

<Callout type="success">
  **Tip:** if you cannot install the CLI globally, you can run it with `npx` instead:

  ```bash
  npx --package "@qvac/cli" qvac --help
  ```
</Callout>

## OpenAI-compatible HTTP server

QVAC CLI provides an HTTP server that is compatible with the [OpenAI REST API](https://developers.openai.com/api/reference/overview), enabling broad integration with the AI ecosystem. It internally translates HTTP requests into SDK calls. As a result, any system compatible with the OpenAI REST API can point to `http://localhost:11434/v1/` and work without changes.

<Card href="/cli/http-server" title="HTTP server">
  Learn how to run a local HTTP server that exposes an OpenAI-compatible API.
</Card>

## SDK bundling

The `qvac bundle sdk` command allows you to select only the plugins you need in your project and reduce your application's final bundle size. See [Plugin system](/configuration/plugins) to learn how to use it.

## System requirements check

The `qvac doctor` command validates that the current host can run `@qvac/sdk` and `@qvac/cli` before you hit runtime errors. It prints a human-readable report by default and exits `1` when any required check fails.

<Card href="/system-requirements" title="System requirements">
  Full host matrix, deploy targets, optional tools, exit codes, and JSON schema.
</Card>

## Reference

Run `qvac --help` to see all available commands and `qvac <command> --help` for command-specific options.

### `qvac bundle sdk`

Generate a tree-shaken Bare worker bundle with selected plugins.

| Option                | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| `-c, --config <path>` | Config file path (default: auto-detect `qvac.config.*`)     |
| `--sdk-path <path>`   | Path to SDK package (default: auto-detect in node\_modules) |
| `--host <target>`     | Target host (repeatable)                                    |
| `--defer <module>`    | Defer a module (repeatable)                                 |
| `-q, --quiet`         | Minimal output                                              |
| `-v, --verbose`       | Detailed output                                             |

### `qvac serve openai`

Start an OpenAI-compatible REST API server.

| Option                    | Description                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `-c, --config <path>`     | Config file path (default: auto-detect `qvac.config.*`)                                                            |
| `-p, --port <number>`     | Port to listen on (default: `11434`)                                                                               |
| `-H, --host <address>`    | Host to bind to (default: `127.0.0.1`)                                                                             |
| `--model <alias>`         | Model alias to preload (repeatable, must be in config)                                                             |
| `--api-key <key>`         | Require Bearer token authentication                                                                                |
| `--cors`                  | Enable CORS headers                                                                                                |
| `--docs`                  | Mount the Swagger UI at `/docs` (auto-enables CORS so the UI's "Try it out" works across origins). Off by default. |
| `--public-base-url <url>` | Externally reachable origin (required for image `response_format=url`)                                             |
| `-v, --verbose`           | Detailed output                                                                                                    |

### `qvac openai spec`

Emit the OpenAPI 3.1.0 spec for the OpenAI-compatible HTTP server to stdout or a file, without starting the server. Useful for piping into offline doc generators (Redocly, Widdershins, etc.) or wiring API clients.

| Option                | Description                                 |
| --------------------- | ------------------------------------------- |
| `--yaml`              | Emit YAML instead of JSON (default: JSON).  |
| `-o, --output <path>` | Write the spec to a file instead of stdout. |

Examples:

```bash
qvac openai spec                       # JSON → stdout (pipe-safe)
qvac openai spec -o spec.json          # write JSON to file
qvac openai spec --yaml                # YAML → stdout
qvac openai spec --yaml -o spec.yaml   # write YAML to file
```

### `qvac doctor`

Run a preflight check of host system requirements.

| Option        | Description                                             |
| ------------- | ------------------------------------------------------- |
| `--json`      | Emit a machine-readable `DoctorReport` JSON.            |
| `-q, --quiet` | Set the exit code only; suppress human-readable output. |


Https server

# CLI (/cli)



## Overview

QVAC CLI is provided through the `@qvac/cli` npm package. The CLI is installed globally so the `qvac` command is available on your `PATH`. At the moment, it provides the following functionality:

* OpenAI-compatible HTTP server
* SDK bundling
* System requirements check

## Usage

<Steps>
  <Step>
    Install the CLI globally so the `qvac` command is available on your `PATH`:

    ```bash
    npm install -g @qvac/cli
    ```
  </Step>

  <Step>
    Create a `qvac.config.*` file in the root of your project and add the configuration required for the functionality you want to use. See [Configuration](/configuration) to learn how to do this.
  </Step>

  <Step>
    Run a command:

    ```bash
    qvac --help
    ```
  </Step>
</Steps>

<Callout type="success">
  **Tip:** if you cannot install the CLI globally, you can run it with `npx` instead:

  ```bash
  npx --package "@qvac/cli" qvac --help
  ```
</Callout>

## OpenAI-compatible HTTP server

QVAC CLI provides an HTTP server that is compatible with the [OpenAI REST API](https://developers.openai.com/api/reference/overview), enabling broad integration with the AI ecosystem. It internally translates HTTP requests into SDK calls. As a result, any system compatible with the OpenAI REST API can point to `http://localhost:11434/v1/` and work without changes.

<Card href="/cli/http-server" title="HTTP server">
  Learn how to run a local HTTP server that exposes an OpenAI-compatible API.
</Card>

## SDK bundling

The `qvac bundle sdk` command allows you to select only the plugins you need in your project and reduce your application's final bundle size. See [Plugin system](/configuration/plugins) to learn how to use it.

## System requirements check

The `qvac doctor` command validates that the current host can run `@qvac/sdk` and `@qvac/cli` before you hit runtime errors. It prints a human-readable report by default and exits `1` when any required check fails.

<Card href="/system-requirements" title="System requirements">
  Full host matrix, deploy targets, optional tools, exit codes, and JSON schema.
</Card>

## Reference

Run `qvac --help` to see all available commands and `qvac <command> --help` for command-specific options.

### `qvac bundle sdk`

Generate a tree-shaken Bare worker bundle with selected plugins.

| Option                | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| `-c, --config <path>` | Config file path (default: auto-detect `qvac.config.*`)     |
| `--sdk-path <path>`   | Path to SDK package (default: auto-detect in node\_modules) |
| `--host <target>`     | Target host (repeatable)                                    |
| `--defer <module>`    | Defer a module (repeatable)                                 |
| `-q, --quiet`         | Minimal output                                              |
| `-v, --verbose`       | Detailed output                                             |

### `qvac serve openai`

Start an OpenAI-compatible REST API server.

| Option                    | Description                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `-c, --config <path>`     | Config file path (default: auto-detect `qvac.config.*`)                                                            |
| `-p, --port <number>`     | Port to listen on (default: `11434`)                                                                               |
| `-H, --host <address>`    | Host to bind to (default: `127.0.0.1`)                                                                             |
| `--model <alias>`         | Model alias to preload (repeatable, must be in config)                                                             |
| `--api-key <key>`         | Require Bearer token authentication                                                                                |
| `--cors`                  | Enable CORS headers                                                                                                |
| `--docs`                  | Mount the Swagger UI at `/docs` (auto-enables CORS so the UI's "Try it out" works across origins). Off by default. |
| `--public-base-url <url>` | Externally reachable origin (required for image `response_format=url`)                                             |
| `-v, --verbose`           | Detailed output                                                                                                    |

### `qvac openai spec`

Emit the OpenAPI 3.1.0 spec for the OpenAI-compatible HTTP server to stdout or a file, without starting the server. Useful for piping into offline doc generators (Redocly, Widdershins, etc.) or wiring API clients.

| Option                | Description                                 |
| --------------------- | ------------------------------------------- |
| `--yaml`              | Emit YAML instead of JSON (default: JSON).  |
| `-o, --output <path>` | Write the spec to a file instead of stdout. |

Examples:

```bash
qvac openai spec                       # JSON → stdout (pipe-safe)
qvac openai spec -o spec.json          # write JSON to file
qvac openai spec --yaml                # YAML → stdout
qvac openai spec --yaml -o spec.yaml   # write YAML to file
```

### `qvac doctor`

Run a preflight check of host system requirements.

| Option        | Description                                             |
| ------------- | ------------------------------------------------------- |
| `--json`      | Emit a machine-readable `DoctorReport` JSON.            |
| `-q, --quiet` | Set the exit code only; suppress human-readable output. |


integration

# Integrate with the OpenAI-compatible API (/cli/http-server/integration)



## Overview

The npm package `@qvac/ai-sdk-provider` is a thin wrapper around [@ai-sdk/openai-compatible](https://www.npmjs.com/package/@ai-sdk/openai-compatible) that provides a better developer experience when integrating with the QVAC OpenAI-compatible API.

*At the moment, its main advantage is providing introspection of the models supported by QVAC for each API operation.* In addition, it provides branded exports, automatic configuration, and a discoverable handle for the [models.dev](https://models.dev) catalog, allowing QVAC to appear in `/connect` for [OpenCode](https://opencode.ai) and other catalog consumers.

## Installation

Install the package along with its peer dependencies:

```bash
npm install @qvac/ai-sdk-provider ai @ai-sdk/openai-compatible
```

## Basic usage

Create a provider instance and use it to request AI inference:

```js
import { createQvac } from '@qvac/ai-sdk-provider'
import { streamText } from 'ai'

const qvac = createQvac({
  baseURL: 'http://localhost:11434/v1', // match your HTTP server
  apiKey: 'qvac'                         // any non-empty value; HTTP server does not validate it
})

const { textStream } = streamText({
  model: qvac('qwen3-600m'),
  prompt: 'Write a haiku about local-first AI.'
})

for await (const chunk of textStream) {
  process.stdout.write(chunk)
}
```

The provider exposes the same surface as the [Vercel AI SDK provider](https://ai-sdk.dev):

```
qvac('qwen3-600m')                     // language model (chat)
qvac.chatModel('qwen3-600m')           // explicit chat model
qvac.completionModel('qwen3-600m')     // legacy completion model
qvac.textEmbeddingModel('embed-gemma') // text embeddings
qvac.imageModel('flux-schnell')        // image generation
```

## Using with coding agents

The HTTP server's primary use case is integrating local AI with coding agents (e.g., OpenCode, Cline, Aider, Continue, and Roo). Although the API is OpenAI-compatible, *the following behaviors require explicit configuration for this use case.*

### Concurrent requests collide on a single model instance

The underlying `llm-llamacpp` addon serializes inference per native model context and rejects concurrent requests rather than queuing them. The server log `shows Cannot set new job: a job is already set or being processed`; clients see `500 An internal error occurred`.

Coding agents routinely fire concurrent requests — typically a main chat completion plus a "title generation" call for the conversation panel. *To get parallel inference you need two different model files loaded under two aliases*. For example:

```json
// qvac.config.json — agent-friendly setup
{
  "serve": {
    "models": {
      "qwen3-8b-chat": {
        "model": "QWEN3_8B_INST_Q4_K_M",
        "preload": true,
        "config": {
          "ctx_size": 16384,
          "reasoning_budget": 0
        }
      },
      "qwen3-1_7b-title": {
        "model": "QWEN3_1_7B_INST_Q4",
        "preload": true,
        "config": {
          "ctx_size": 4096,
          "reasoning_budget": 0
        }
      }
    }
  }
}
```

Then map the two aliases to your harness's chat and utility model slots. For example, for OpenCode:

```json
// opencode.json
{
  "model":       "qvac/qwen3-8b-chat",
  "small_model": "qvac/qwen3-1_7b-title"
}
```

### `ctx_size` defaults to 1024 — too small for agents

The default LLM `ctx_size` is 1024 tokens, which is fine for short chats and unusable for coding agents: a typical OpenCode message ships 10–15 tool definitions plus a system prompt, easily 2–4k tokens before the user's first message lands. Set `ctx_size` explicitly per model (`16384` is a sensible default for chat, `4096` is enough for title generation) or you'll see context fills and truncated responses well before the model misbehaves.

### `reasoning_budget: 0` to suppress `<think>` blocks

Reasoning-tuned models (Qwen3, DeepSeek-R1, etc.) emit `<think>…</think>` blocks before their final answer. Hosts that lack a reasoning channel render them verbatim in the chat UI, which looks broken and burns latency on tokens the user never sees. Set `reasoning_budget: 0` per model to disable reasoning at the addon level — cleaner output, meaningfully faster responses.

### Local-model capability is the real ceiling

Your local-model choice decides whether an agent actually works. Empirical findings from this HTTP server with OpenCode testing:

* **Q4-quantized 4B/8B Qwen3-Instruct** can hold a conversation but won't reliably *invoke* tools. The model will say "let me search the docs" without emitting a tool call, then fabricate an answer.
* **Cloud Qwen3.5-9B** (full precision, e.g. via OpenRouter) calls tools aggressively but still hallucinates content from tool results.
* Reliable local tool use generally needs $\geq$ **14B parameters and coder/agent post-training** (e.g. `GPT_OSS_20B_INST_Q4_K_M` from the catalog, future Qwen3-Coder variants). Plain Instruct tunes at 4–8B sizes are not reliable agent backends.

<Callout type="info">
  This is an industry-wide reality for local AI, not something specific to QVAC. Calibrate user expectations accordingly when documenting QVAC integrations for downstream harnesses.
</Callout>

### API key

The default `apiKey` is the literal string `'qvac'`. The HTTP server does not validate the key; the value matters only because some OpenAI-shaped HTTP clients refuse to issue a request without an `Authorization` header.

## Model metadata

`@qvac/ai-sdk-provider` ships QVAC model metadata, *so you can introspect models without making an HTTP call to /v1/models.* For example:

```ts
import { models, allModels } from '@qvac/ai-sdk-provider'

models.QWEN3_4B_INST_Q4_K_M.endpointCategory  // 'chat' (compile-time known)
models.WHISPER_EN_TINY_Q8_0.endpointCategory  // 'transcription'

for (const m of allModels) {
  console.log(`${m.name} (${m.endpointCategory}, ${m.expectedSize} bytes)`)
}
```

Each constant satisfies `ModelConstant<TEndpoint>` where `TEndpoint` is one of:

```ts
type EndpointCategory =
  | 'chat'
  | 'embedding'
  | 'transcription'
  | 'audio-translation'
  | 'translation'
  | 'speech'
  | 'ocr'
  | 'image'
```

## API

### `createQvac(options?: QvacOptions): QvacProvider`

Factory returning a branded Vercel AI SDK provider. Wraps `createOpenAICompatible` with QVAC defaults.

```ts
interface QvacOptions {
  baseURL?: string                       // default: see Default base URL
  apiKey?: string                        // default: 'qvac'
  headers?: Record<string, string>       // default: {}
  fetch?: typeof fetch                   // default: globalThis.fetch
}
```

### `qvac`

A default `createQvac()` instance with all defaults. Convenient for quick scripts; explicit `createQvac({ baseURL })` is recommended.

<Callout type="warn" title="Default provider port does not match HTTP server's default port.">
  The provider defaults to `http://127.0.0.1:11435/v1`, while `qvac serve openai` listens on `11434` by default. This mismatch is intentional — `11434` collides with Ollama, so the provider ships a placeholder port until the CLI default is changed. Until then, **always pass `baseURL` explicitly** when calling `createQvac({ baseURL })`, matching the port your `qvac serve openai` instance is bound to (e.g. `http://127.0.0.1:11434/v1` for the CLI default).
</Callout>

### `models`, `allModels`, `ModelConstant`, `EndpointCategory`

Re-exported model metadata. See [Model metadata](#model-metadata).


Models
Download lifecycle

# Download lifecycle (/models/download-lifecycle)



## Overview

Downloads in QVAC are *resumable by default*. When you download an asset via [`downloadAsset()`](/reference/api#downloadasset) or [`loadModel()`](/reference/api#loadmodel)), the SDK writes partial files to disk so the next run can continue from where it left off. The progress callback provides a `downloadKey` that identifies the underlying transfer (useful for dedup and cache identification), but cancellation is targeted by `requestId`.

Both `downloadAsset()` and `loadModel()` return a decorated promise (`Promise<string> & { requestId: string }`) that exposes a synchronous `requestId` field, so you can wire a stop button to a specific in-flight call without waiting for the first progress event. See [Cancel a specific call by `requestId`](#cancel-a-specific-call-by-requestid) below.

## Functions

1. [`downloadAsset()`](/reference/api#downloadasset) or [`loadModel()`](/reference/api#loadmodel) — with `onProgress` for progress tracking; both return a decorated promise that exposes `op.requestId` synchronously.
2. [`cancel()`](/reference/api#cancel) — either:
   * `cancel({ requestId: op.requestId })` — pause this specific call (preserves the partial file for automatic resume on the next run).
   * `cancel({ requestId: op.requestId, clearCache: true })` — discard the partial file along with the cancel.
   * `cancel({ modelId })` — broad sweep that cancels every in-flight request on the given model, including non-download ops. See [Cancellation — broad cancel by `modelId`](/runtime/cancellation#broad-cancel-by-modelid-escape-hatch).

For how to use each function, see [SDK — API reference](/reference/api/).

## Cancel a specific call by `requestId`

Both `downloadAsset()` and `loadModel()` return `Promise<string> & { requestId: string }`. The await result is unchanged (the asset path or model id, respectively), but `op.requestId` is available **synchronously** before `await` resolves — so a stop button can be wired immediately, before the first progress event arrives:

```ts
const op = downloadAsset({ assetSrc: "https://example.com/big.gguf" });
op.requestId; // synchronously available, before await

// Pause: preserves the partial file for automatic resume on the next call.
stopButton.onclick = () => cancel({ requestId: op.requestId });

// Or: discard the partial file along with the cancel.
clearButton.onclick = () => cancel({ requestId: op.requestId, clearCache: true });

await op; // rejects with InferenceCancelledError if cancelled
```

When two callers request the same artifact, the SDK deduplicates them onto a single underlying transfer. `cancel({ requestId })` rejects only the cancelling subscriber's promise; the underlying transfer keeps running to serve any other subscribers. The transfer is aborted only when the **last** subscriber leaves.

For the broader cancellation contract (errors, decorated-promise pattern across other SDK operations, broad cancel by `modelId`), see [Cancellation](/runtime/cancellation).

## Flow

* Pause: call [`cancel()`](/reference/api#cancel) with `requestId: op.requestId` from the decorated promise returned by `downloadAsset()` / `loadModel()`.
* Resume: run the same `downloadAsset()` / `loadModel()` call again — the SDK will reuse the partial file and continue downloading.
* Discard partial file: call `cancel({ requestId: op.requestId, clearCache: true })`.

## Example

The following script shows an example of pausing and resuming a download using `cancel({ requestId })` + the decorated-promise pattern:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/download-with-cancel.js title="download-lifecycle.js" lineNumbers
      import { cancel, close, downloadAsset, LLAMA_3_2_1B_INST_Q4_0, } from "@qvac/sdk";
      console.log(`🚀 Starting download with pause/resume example`);
      console.log(`\n💡 Press Ctrl+C to pause the download (it will resume on restart)\n`);
      let modelId;
      let cancelled = false;
      try {
          // Download model with progress tracking and cancellation. The
          // `downloadAsset(...)` call returns a *decorated* promise: the
          // promise resolves to the modelId, and the same value carries a
          // synchronous `requestId` field so we can cancel before it settles.
          const download = downloadAsset({
              assetSrc: LLAMA_3_2_1B_INST_Q4_0,
              onProgress: (progress) => {
                  const downloadedMB = (progress.downloaded / 1024 / 1024).toFixed(2);
                  const totalMB = (progress.total / 1024 / 1024).toFixed(2);
                  const percentage = progress.percentage.toFixed(1);
                  console.log(`📊 Progress: ${percentage}% (${downloadedMB}MB / ${totalMB}MB)`);
                  // Example: Stops at 10% (or use Ctrl+C for manual stop)
                  if (parseFloat(percentage) >= 10 && !cancelled) {
                      console.log("\n🚫 Auto-cancelling at 10% for demo purposes...,");
                      console.log(`📊 Progress: ${percentage}% (${downloadedMB}MB / ${totalMB}MB)`);
                      console.log(progress);
                      cancelled = true;
                      void cancel({
                          requestId: download.requestId,
                          // clearCache: true, // Uncomment to delete partial file instead of resuming
                      });
                  }
              },
          });
          await download;
          console.log(`\n✅ Model downloaded successfully! Model ID: ${modelId}`);
          console.log("🎯 Download completed without interruption");
          void close();
      }
      catch (error) {
          if (error instanceof Error && error.message.includes("cancelled")) {
              console.log("✅ Download was successfully cancelled");
              void close();
          }
          else {
              console.error("❌ Error:", error);
              process.exit(1);
          }
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/download-with-cancel.ts title="download-lifecycle.ts" lineNumbers
      import {
        cancel,
        close,
        downloadAsset,
        LLAMA_3_2_1B_INST_Q4_0,
      } from "@qvac/sdk";

      console.log(`🚀 Starting download with pause/resume example`);
      console.log(
        `\n💡 Press Ctrl+C to pause the download (it will resume on restart)\n`,
      );

      let modelId: string | undefined;
      let cancelled = false;

      try {
        // Download model with progress tracking and cancellation. The
        // `downloadAsset(...)` call returns a *decorated* promise: the
        // promise resolves to the modelId, and the same value carries a
        // synchronous `requestId` field so we can cancel before it settles.
        const download = downloadAsset({
          assetSrc: LLAMA_3_2_1B_INST_Q4_0,
          onProgress: (progress) => {
            const downloadedMB = (progress.downloaded / 1024 / 1024).toFixed(2);
            const totalMB = (progress.total / 1024 / 1024).toFixed(2);
            const percentage = progress.percentage.toFixed(1);

            console.log(
              `📊 Progress: ${percentage}% (${downloadedMB}MB / ${totalMB}MB)`,
            );

            // Example: Stops at 10% (or use Ctrl+C for manual stop)
            if (parseFloat(percentage) >= 10 && !cancelled) {
              console.log("\n🚫 Auto-cancelling at 10% for demo purposes...,");
              console.log(
                `📊 Progress: ${percentage}% (${downloadedMB}MB / ${totalMB}MB)`,
              );
              console.log(progress);
              cancelled = true;

              void cancel({
                requestId: download.requestId,
                // clearCache: true, // Uncomment to delete partial file instead of resuming
              });
            }
          },
        });
        await download;

        console.log(`\n✅ Model downloaded successfully! Model ID: ${modelId}`);
        console.log("🎯 Download completed without interruption");
        void close();
      } catch (error) {
        if (error instanceof Error && error.message.includes("cancelled")) {
          console.log("✅ Download was successfully cancelled");
          void close();
        } else {
          console.error("❌ Error:", error);
          process.exit(1);
        }
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>


Shared models

# Sharded models (/models/sharded-models)



## Overview

Some models may be distributed as **multiple files** (shards) instead of a single large one. [`loadModel()`](/reference/api#loadmodel) supports sharded models and ensures that all shards are available before loading it. For this, shard file names **must** follow the pattern: `<name>-00001-of-0000X.<ext>`.

<Callout type="info">
  **Important:** for now, sharded models are supported only for GGUF models.
</Callout>

## Supported formats

* Archives (`.tar`, `.tar.gz`, `.tgz`): HTTP or local with automatic extraction
* HTTP sharded URL: pass the download URL of any shard and the SDK will fetch the remaining shards
* Local shards: pass the path to any shard file.

## Local sharded models

All files **must** be present in the same directory:

* All numbered shard files, for example:
  * `model-00001-of-00005.gguf`
  * `model-00002-of-00005.gguf`
  * …
  * `model-00005-of-00005.gguf`
* A companion tensors manifest file:
  * `model.tensors.txt`

When using `loadModel()`, you pass the path to the first shard (e.g., `model-00001-of-00005.gguf`), and the SDK automatically detects and loads the remaining shards.

## Functions

1. [`loadModel()`](/reference/api#loadmodel) — pass the path/URL of any shard; SDK fetches remaining shards
2. Use the model as usual ([`completion()`](/reference/api#completion), [`embed()`](/reference/api#embed), etc.)
3. [`unloadModel()`](/reference/api#unloadmodel)

For how to use each function, see [SDK — API reference](/reference/api/).

## Example

The following script shows an example of loading a sharded model with per-shard progress tracking:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/llamacpp-sharded.js title="sharded-models.js" lineNumbers
      import { completion, loadModel, unloadModel, VERBOSITY } from "@qvac/sdk";
      // Sharded models can be loaded from:
      // 1. HTTP archives: "https://example.com/model.tar.gz"
      // 2. HTTP pattern: "https://example.com/model-00001-of-00005.gguf"
      // 3. Hyperdrive: use any sharded model source/constant, eg: LLAMA_3_2_1B_INST_Q4_0_SHARD
      // 4. Local filesystem: pass the path to the first shard file (Note: All shards must be in the same directory)
      // 5. Local archive: pass the path to the archive file (.tar, .tar.gz, .tgz)
      try {
          const modelId = await loadModel({
              modelSrc: "https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct-GGUF/resolve/main/qwen2.5-coder-7b-instruct-q4_0-00001-of-00002.gguf",
              modelType: "llamacpp-completion",
              modelConfig: {
                  device: "gpu",
                  ctx_size: 2048,
                  verbosity: VERBOSITY.ERROR,
              },
              onProgress: (progress) => {
                  // For sharded models, progress.shardInfo contains detailed progress for both
                  // individual shards AND overall download progress across all shards
                  if (progress.shardInfo) {
                      // For pattern-based or Hyperdrive shards
                      const { shardInfo } = progress;
                      console.log(`📥 Downloading ${shardInfo.shardName} (${shardInfo.currentShard}/${shardInfo.totalShards})\n` +
                          `   File: ${progress.percentage.toFixed(1)}% (${(progress.downloaded / 1024 / 1024).toFixed(2)}MB / ${(progress.total / 1024 / 1024).toFixed(2)}MB)\n` +
                          `   Overall: ${shardInfo.overallPercentage.toFixed(1)}% (${(shardInfo.overallDownloaded / 1024 / 1024).toFixed(2)}MB / ${(shardInfo.overallTotal / 1024 / 1024).toFixed(2)}MB)`);
                  }
                  else {
                      // For archive-based shards
                      console.log(`📥 Progress: ${progress.percentage.toFixed(1)}% ` +
                          `(${(progress.downloaded / 1024 / 1024).toFixed(2)}MB / ${(progress.total / 1024 / 1024).toFixed(2)}MB)`);
                  }
              },
          });
          const history = [
              {
                  role: "user",
                  content: "What are the benefits of sharding large language models? Use emojis in your response.",
              },
          ];
          const result = completion({ modelId, history, stream: true });
          console.log("\n🤖 Model response:");
          for await (const token of result.tokenStream) {
              process.stdout.write(token);
          }
          const stats = await result.stats;
          console.log("\n\n📊 Performance Stats:", stats);
          await unloadModel({ modelId, clearStorage: false });
          process.exit(0);
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/llamacpp-sharded.ts title="sharded-models.ts" lineNumbers
      import { completion, loadModel, unloadModel, VERBOSITY } from "@qvac/sdk";

      // Sharded models can be loaded from:
      // 1. HTTP archives: "https://example.com/model.tar.gz"
      // 2. HTTP pattern: "https://example.com/model-00001-of-00005.gguf"
      // 3. Hyperdrive: use any sharded model source/constant, eg: LLAMA_3_2_1B_INST_Q4_0_SHARD
      // 4. Local filesystem: pass the path to the first shard file (Note: All shards must be in the same directory)
      // 5. Local archive: pass the path to the archive file (.tar, .tar.gz, .tgz)

      try {
        const modelId = await loadModel({
          modelSrc:
            "https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct-GGUF/resolve/main/qwen2.5-coder-7b-instruct-q4_0-00001-of-00002.gguf",
          modelType: "llamacpp-completion",
          modelConfig: {
            device: "gpu",
            ctx_size: 2048,
            verbosity: VERBOSITY.ERROR,
          },
          onProgress: (progress) => {
            // For sharded models, progress.shardInfo contains detailed progress for both
            // individual shards AND overall download progress across all shards
            if (progress.shardInfo) {
              // For pattern-based or Hyperdrive shards
              const { shardInfo } = progress;

              console.log(
                `📥 Downloading ${shardInfo.shardName} (${shardInfo.currentShard}/${shardInfo.totalShards})\n` +
                  `   File: ${progress.percentage.toFixed(1)}% (${(progress.downloaded / 1024 / 1024).toFixed(2)}MB / ${(progress.total / 1024 / 1024).toFixed(2)}MB)\n` +
                  `   Overall: ${shardInfo.overallPercentage.toFixed(1)}% (${(shardInfo.overallDownloaded / 1024 / 1024).toFixed(2)}MB / ${(shardInfo.overallTotal / 1024 / 1024).toFixed(2)}MB)`,
              );
            } else {
              // For archive-based shards
              console.log(
                `📥 Progress: ${progress.percentage.toFixed(1)}% ` +
                  `(${(progress.downloaded / 1024 / 1024).toFixed(2)}MB / ${(progress.total / 1024 / 1024).toFixed(2)}MB)`,
              );
            }
          },
        });

        const history = [
          {
            role: "user",
            content:
              "What are the benefits of sharding large language models? Use emojis in your response.",
          },
        ];

        const result = completion({ modelId, history, stream: true });

        console.log("\n🤖 Model response:");
        for await (const token of result.tokenStream) {
          process.stdout.write(token);
        }

        const stats = await result.stats;
        console.log("\n\n📊 Performance Stats:", stats);

        await unloadModel({ modelId, clearStorage: false });
        process.exit(0);
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>


AI capabilities
Text generation

# Text generation (/ai-capabilities/text-generation)



## Overview

Text generation uses [`qvac-fabric-llm.cpp`](https://github.com/tetherto/qvac-fabric-llm.cpp) as inference engine. Load any supported model using `modelType: "llm"`. Then, provide array `history` as input where each element is an object with properties:

* `role: string`; can be either `"user"` or `"assistant"`
* `content: string`

`role: "user"` indicates that `content` is a previous prompt.  `role: "assistant"` indicates that `content` is a previous inference (LLM output).

Output is generated based on the full sequence of messages provided in `history`.

## Functions

Use the following sequence of function calls:

1. [`loadModel()`](/reference/api#loadmodel)
2. [`completion()`](/reference/api#completion)
3. [`unloadModel()`](/reference/api#unloadmodel)

For how to use each function, see [SDK — API reference](/reference/api/).

## Models

You can load any [`llama.cpp`](https://github.com/ggml-org/llama.cpp)-compatible text-generation/chat model. Model file format: `*.gguf`.

* If the model is sharded across multiple files (a multi-file bundle), see [Sharded models](/models/sharded-models).
* For multimodal prompts (images + text), see [Multimodal](/ai-capabilities/multimodal).
* To adapt a model to domain-specific tasks, see [Fine-tuning](/ai-capabilities/fine-tuning).
* For models available as constants, see [SDK — Models](/introduction#models).

## Features

* Event stream: `completion()` exposes a single ordered `events` async iterable plus an aggregated `final` promise. Events are discriminated by `type` — `contentDelta`, `thinkingDelta`, `toolCall`, `toolError`, `completionStats`, `completionDone`, `rawDelta`. The terminal `completionDone` event carries a `stopReason` (e.g. `"eos"`, `"length"`, `"cancelled"`).
* Thinking content: models that emit `<think>` blocks surface them as dedicated `thinkingDelta` events (enable with `captureThinking: true`), so consumers don't have to parse tags from raw text.
* Tool calls: the model emits structured tool calls as `toolCall` events ordered alongside content and thinking in the same stream.
* MCP: plug MCP servers into `completion()` so the model can use external tools (e.g., web search) via the same tool-call mechanism.
* Raw output: with `emitRawDeltas: true`, every raw model token is also emitted as a `rawDelta` event in parallel to the structured events — useful for debugging or full-fidelity logging.
* KV cache: cache and reuse the model’s key/value attention state to speed up follow-up turns in long conversations.

## Examples

### Usage

The canonical way to consume `completion()` is the `events` async iterable plus the aggregated `final` promise. The following script shows how to handle each event type and read the aggregated result:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/completion-events.js title="completion-events.js" lineNumbers
      /**
       * Event-driven completion — demonstrates the unified `CompletionEvent` stream.
       *
       * `completion()` returns a `CompletionRun` with two primary surfaces:
       *
       *  - `events`  — an `AsyncIterable<CompletionEvent>` of ordered, typed events
       *                (`contentDelta`, `thinkingDelta`, `toolCall`, `toolError`,
       *                 `completionStats`, `completionDone`, `rawDelta`).
       *  - `final`   — a `Promise<CompletionFinal>` that resolves once the stream
       *                ends, providing aggregated `contentText`, `thinkingText`,
       *                `toolCalls`, `stats`, and `raw.fullText`.
       *
       * Set `captureThinking: true` to attempt best-effort `<think>` block parsing
       * into dedicated `thinkingDelta` events. `final.raw.fullText` keeps the exact
       * model output.
       */
      import { completion, loadModel, unloadModel, QWEN3_600M_INST_Q4, } from "@qvac/sdk";
      try {
          const modelId = await loadModel({
              modelSrc: QWEN3_600M_INST_Q4,
              modelConfig: { ctx_size: 4096 },
              onProgress: (p) => console.log(`Loading: ${p.percentage.toFixed(1)}%`),
          });
          console.log(`✅ Model loaded: ${modelId}\n`);
          const result = completion({
              modelId,
              history: [
                  { role: "user", content: "Explain quantum computing in 2 sentences" },
              ],
              stream: true,
              captureThinking: true,
          });
          for await (const event of result.events) {
              handleEvent(event);
          }
          const final = await result.final;
          console.log("\n\n--- Final Result ---");
          console.log(`Content: ${final.contentText}\n`);
          if (final.thinkingText) {
              console.log(`Thinking: ${final.thinkingText}\n`);
          }
          if (final.stats) {
              console.log(`Stats: ${final.stats.tokensPerSecond?.toFixed(1)} tok/s`);
          }
          if (final.toolCalls.length > 0) {
              console.log(`Tool calls: ${final.toolCalls.map((c) => c.name).join(", ")}`);
          }
          console.log(`Raw output length: ${final.raw.fullText.length} chars`);
          await unloadModel({ modelId, clearStorage: false });
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      function handleEvent(event) {
          switch (event.type) {
              case "contentDelta":
                  process.stdout.write(event.text);
                  break;
              case "thinkingDelta":
                  process.stdout.write(`\x1b[2m${event.text}\x1b[0m`);
                  break;
              case "toolCall":
                  console.log(`\n→ Tool: ${event.call.name}(${JSON.stringify(event.call.arguments)})`);
                  break;
              case "toolError":
                  console.warn(`\n⚠ Tool error [${event.error.code}]: ${event.error.message}`);
                  break;
              case "completionStats":
                  console.log(`\n📊 ${event.stats.tokensPerSecond?.toFixed(1)} tok/s`);
                  break;
              case "completionDone":
                  if (event.stopReason === "error" && "error" in event) {
                      console.error(`\n❌ ${event.error.message}`);
                  }
                  break;
              case "rawDelta":
                  break;
          }
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/completion-events.ts title="completion-events.ts" lineNumbers
      /**
       * Event-driven completion — demonstrates the unified `CompletionEvent` stream.
       *
       * `completion()` returns a `CompletionRun` with two primary surfaces:
       *
       *  - `events`  — an `AsyncIterable<CompletionEvent>` of ordered, typed events
       *                (`contentDelta`, `thinkingDelta`, `toolCall`, `toolError`,
       *                 `completionStats`, `completionDone`, `rawDelta`).
       *  - `final`   — a `Promise<CompletionFinal>` that resolves once the stream
       *                ends, providing aggregated `contentText`, `thinkingText`,
       *                `toolCalls`, `stats`, and `raw.fullText`.
       *
       * Set `captureThinking: true` to attempt best-effort `<think>` block parsing
       * into dedicated `thinkingDelta` events. `final.raw.fullText` keeps the exact
       * model output.
       */

      import {
        completion,
        loadModel,
        unloadModel,
        QWEN3_600M_INST_Q4,
        type CompletionEvent,
      } from "@qvac/sdk";

      try {
        const modelId = await loadModel({
          modelSrc: QWEN3_600M_INST_Q4,
          modelConfig: { ctx_size: 4096 },
          onProgress: (p) => console.log(`Loading: ${p.percentage.toFixed(1)}%`),
        });
        console.log(`✅ Model loaded: ${modelId}\n`);

        const result = completion({
          modelId,
          history: [
            { role: "user", content: "Explain quantum computing in 2 sentences" },
          ],
          stream: true,
          captureThinking: true,
        });

        for await (const event of result.events) {
          handleEvent(event);
        }

        const final = await result.final;

        console.log("\n\n--- Final Result ---");
        console.log(`Content: ${final.contentText}\n`);
        if (final.thinkingText) {
          console.log(`Thinking: ${final.thinkingText}\n`);
        }
        if (final.stats) {
          console.log(`Stats: ${final.stats.tokensPerSecond?.toFixed(1)} tok/s`);
        }
        if (final.toolCalls.length > 0) {
          console.log(`Tool calls: ${final.toolCalls.map((c) => c.name).join(", ")}`);
        }
        console.log(`Raw output length: ${final.raw.fullText.length} chars`);

        await unloadModel({ modelId, clearStorage: false });
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }

      function handleEvent(event: CompletionEvent) {
        switch (event.type) {
          case "contentDelta":
            process.stdout.write(event.text);
            break;
          case "thinkingDelta":
            process.stdout.write(`\x1b[2m${event.text}\x1b[0m`);
            break;
          case "toolCall":
            console.log(
              `\n→ Tool: ${event.call.name}(${JSON.stringify(event.call.arguments)})`,
            );
            break;
          case "toolError":
            console.warn(
              `\n⚠ Tool error [${event.error.code}]: ${event.error.message}`,
            );
            break;
          case "completionStats":
            console.log(`\n📊 ${event.stats.tokensPerSecond?.toFixed(1)} tok/s`);
            break;
          case "completionDone":
            if (event.stopReason === "error" && "error" in event) {
              console.error(`\n❌ ${event.error.message}`);
            }
            break;
          case "rawDelta":
            break;
        }
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="info">
  The examples below (`Tool call`, `MCP`, `KV cache`) still consume `result.tokenStream` and `result.toolCallStream`, which are convenience wrappers around the canonical `events` / `final` stream shown above. Both APIs are supported; new code should prefer `events` / `final`.
</Callout>

### Tool call

The following script shows how to provide tool definitions to `completion()`, consume the streaming output, and read the parsed tool calls.

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/tools/llamacpp-native-tools.js title="completion-tool-call.js" lineNumbers
      import { completion, loadModel, unloadModel, QWEN3_1_7B_INST_Q4, } from "@qvac/sdk";
      import { tools, toolSchemas, mockExecute } from "./shared";
      try {
          const modelId = await loadModel({
              modelSrc: QWEN3_1_7B_INST_Q4,
              modelConfig: {
                  ctx_size: 4096,
                  tools: true,
              },
              onProgress: (progress) => console.log(`Loading: ${progress.percentage.toFixed(1)}%`),
          });
          console.log(`✅ Model loaded successfully! Model ID: ${modelId}`);
          const history = [
              {
                  role: "system",
                  content: "You are a helpful assistant that can use tools to get the weather and horoscope.",
              },
              {
                  role: "user",
                  content: "What's the weather in Tokyo and my horoscope for Aquarius?",
              },
          ];
          console.log("\n🤖 AI Response:");
          console.log("(Streaming with tool definitions in prompt)\n");
          const result = completion({ modelId, history, stream: true, tools });
          const tokensTask = (async () => {
              for await (const token of result.tokenStream) {
                  process.stdout.write(token);
              }
          })();
          const toolsTask = (async () => {
              for await (const evt of result.toolCallStream) {
                  console.log(`\n\n→ Tool Call Detected: ${evt.call.name}(${JSON.stringify(evt.call.arguments)})`);
                  console.log(`   ID: ${evt.call.id}`);
              }
          })();
          await Promise.all([tokensTask, toolsTask]);
          const stats = await result.stats;
          const toolCalls = await result.toolCalls;
          console.log("\n\n📋 Parsed Tool Calls:");
          if (toolCalls.length > 0) {
              for (const call of toolCalls) {
                  console.log(`  - ${call.name}(${JSON.stringify(call.arguments)})`);
                  const schema = toolSchemas[call.name];
                  if (schema) {
                      const validated = schema.safeParse(call.arguments);
                      if (validated.success) {
                          console.log(`    ✓ Arguments validated with Zod`);
                      }
                      else {
                          console.log(`    ✗ Validation failed:`, validated.error);
                      }
                  }
              }
          }
          else {
              console.log("  No tool calls detected in response");
          }
          console.log("\n📊 Performance Stats:", stats);
          if (toolCalls.length > 0) {
              console.log("\n\n🔧 Simulating Tool Execution...");
              const toolResults = toolCalls.map((call) => {
                  const result = mockExecute(call.name, call.arguments);
                  console.log(`  ✓ ${call.name}: ${result}`);
                  return { toolCallId: call.id, result };
              });
              history.push({
                  role: "assistant",
                  content: await result.text,
              });
              for (const toolResult of toolResults) {
                  history.push({
                      role: "tool",
                      content: toolResult.result,
                  });
              }
              console.log("\n\n🤖 Follow-up Response with Tool Results:");
              const followUpResult = completion({
                  modelId,
                  history,
                  stream: true,
                  tools,
              });
              for await (const token of followUpResult.tokenStream) {
                  process.stdout.write(token);
              }
              const followUpStats = await followUpResult.stats;
              console.log("\n\n📊 Follow-up Stats:", followUpStats);
          }
          console.log("\n\n🎉 Completed!");
          await unloadModel({ modelId, clearStorage: false });
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/tools/llamacpp-native-tools.ts title="completion-tool-call.ts" lineNumbers
      import {
        completion,
        loadModel,
        unloadModel,
        type ToolCall,
        type CompletionStats,
        QWEN3_1_7B_INST_Q4,
      } from "@qvac/sdk";
      import { tools, toolSchemas, mockExecute } from "./shared";

      try {
        const modelId = await loadModel({
          modelSrc: QWEN3_1_7B_INST_Q4,
          modelConfig: {
            ctx_size: 4096,
            tools: true,
          },
          onProgress: (progress) =>
            console.log(`Loading: ${progress.percentage.toFixed(1)}%`),
        });
        console.log(`✅ Model loaded successfully! Model ID: ${modelId}`);

        const history = [
          {
            role: "system",
            content:
              "You are a helpful assistant that can use tools to get the weather and horoscope.",
          },
          {
            role: "user",
            content: "What's the weather in Tokyo and my horoscope for Aquarius?",
          },
        ];

        console.log("\n🤖 AI Response:");
        console.log("(Streaming with tool definitions in prompt)\n");

        const result = completion({ modelId, history, stream: true, tools });

        const tokensTask = (async () => {
          for await (const token of result.tokenStream) {
            process.stdout.write(token);
          }
        })();

        const toolsTask = (async () => {
          for await (const evt of result.toolCallStream) {
            console.log(
              `\n\n→ Tool Call Detected: ${evt.call.name}(${JSON.stringify(evt.call.arguments)})`,
            );
            console.log(`   ID: ${evt.call.id}`);
          }
        })();

        await Promise.all([tokensTask, toolsTask]);

        const stats: CompletionStats | undefined = await result.stats;
        const toolCalls: ToolCall[] = await result.toolCalls;

        console.log("\n\n📋 Parsed Tool Calls:");
        if (toolCalls.length > 0) {
          for (const call of toolCalls) {
            console.log(`  - ${call.name}(${JSON.stringify(call.arguments)})`);

            const schema = toolSchemas[call.name as keyof typeof toolSchemas];
            if (schema) {
              const validated = schema.safeParse(call.arguments);
              if (validated.success) {
                console.log(`    ✓ Arguments validated with Zod`);
              } else {
                console.log(`    ✗ Validation failed:`, validated.error);
              }
            }
          }
        } else {
          console.log("  No tool calls detected in response");
        }

        console.log("\n📊 Performance Stats:", stats);

        if (toolCalls.length > 0) {
          console.log("\n\n🔧 Simulating Tool Execution...");

          const toolResults = toolCalls.map((call) => {
            const result = mockExecute(call.name, call.arguments);
            console.log(`  ✓ ${call.name}: ${result}`);
            return { toolCallId: call.id, result };
          });

          history.push({
            role: "assistant",
            content: await result.text,
          });

          for (const toolResult of toolResults) {
            history.push({
              role: "tool",
              content: toolResult.result,
            });
          }

          console.log("\n\n🤖 Follow-up Response with Tool Results:");
          const followUpResult = completion({
            modelId,
            history,
            stream: true,
            tools,
          });

          for await (const token of followUpResult.tokenStream) {
            process.stdout.write(token);
          }

          const followUpStats = await followUpResult.stats;
          console.log("\n\n📊 Follow-up Stats:", followUpStats);
        }

        console.log("\n\n🎉 Completed!");
        await unloadModel({ modelId, clearStorage: false });
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

### MCP

You create and manage the MCP client, connect it to one or more MCP servers, and pass it to `completion()`. The following script shows how to attach an MCP client to `completion()` so the model can call a web search tool and then continue with the results:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/mcp-websearch.js title="completion-mcp.js" lineNumbers
      /**
       * MCP DuckDuckGo Search Example
       *
       * A web search example using DuckDuckGo - no API key required!
       * The server provides tools to search the web and get answers.
       *
       * Prerequisites:
       * - Install MCP SDK: bun add @modelcontextprotocol/sdk
       *
       * Run with: bun run examples/mcp-websearch.ts
       */
      import { completion, loadModel, unloadModel, QWEN3_1_7B_INST_Q4, } from "@/index";
      // MCP SDK is a user-installed optional dependency
      // Install with: bun add @modelcontextprotocol/sdk
      // eslint-disable-next-line import/no-unresolved
      import { Client } from "@modelcontextprotocol/sdk/client/index.js";
      // eslint-disable-next-line import/no-unresolved
      import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
      function parseSearchResults(mcpResult) {
          try {
              const result = mcpResult;
              // Extract text content from MCP response
              const textContent = result.content?.find((c) => c.type === "text");
              if (!textContent?.text) {
                  return JSON.stringify(mcpResult);
              }
              // Parse the JSON array of search results
              const rawResults = JSON.parse(textContent.text);
              // Extract just the useful fields (title, url, snippet)
              const cleanResults = rawResults.slice(0, 5).map((r) => ({
                  title: r.title ?? "Unknown",
                  url: r.url ?? "",
                  snippet: r.snippet ?? "",
              }));
              // Format as concise text for LLM
              return cleanResults
                  .map((r, i) => `[${i + 1}] ${r.title}\n    URL: ${r.url}\n    ${r.snippet}`)
                  .join("\n\n");
          }
          catch {
              // If parsing fails, return a truncated version
              const str = typeof mcpResult === "string" ? mcpResult : JSON.stringify(mcpResult);
              return str.slice(0, 2000);
          }
      }
      let mcpClient = null;
      try {
          console.log("🦆 MCP DuckDuckGo Search Example\n");
          // ============================================================
          // STEP 1: Connect to DuckDuckGo MCP server
          // ============================================================
          console.log("1️⃣  Starting DuckDuckGo MCP server...");
          mcpClient = new Client({
              name: "qvac-ddg-example",
              version: "1.0.0",
          });
          const transport = new StdioClientTransport({
              command: "npx",
              args: ["-y", "@oevortex/ddg_search"],
          });
          await mcpClient.connect(transport);
          console.log("   ✓ MCP server connected\n");
          // ============================================================
          // STEP 2: Load model
          // ============================================================
          console.log("2️⃣  Loading model...");
          const modelId = await loadModel({
              modelSrc: QWEN3_1_7B_INST_Q4,
              modelConfig: {
                  ctx_size: 4096,
                  tools: true,
              },
              onProgress: (progress) => process.stdout.write(`\r   Loading: ${progress.percentage.toFixed(1)}%`),
          });
          console.log(`\n   ✓ Model loaded\n`);
          // ============================================================
          // STEP 3: Ask AI to search the web (with MCP client)
          // ============================================================
          const history = [
              {
                  role: "system",
                  content: `You are a helpful assistant with access to web search.
      Use the search tool when you need current information.
      Always cite your sources with the URL.`,
              },
              {
                  role: "user",
                  content: "What is the current weather in New York City?",
              },
          ];
          console.log("3️⃣  Asking AI to search the web...\n");
          console.log("🤖 AI Response:");
          // Pass MCP client directly to completion - tools are adapted internally!
          const result = completion({
              modelId,
              history,
              stream: true,
              mcp: [{ client: mcpClient, includeResources: false }],
          });
          for await (const token of result.tokenStream) {
              process.stdout.write(token);
          }
          const toolCalls = await result.toolCalls;
          console.log("\n");
          // ============================================================
          // STEP 4: Execute tool calls using call() - automatic MCP routing!
          // ============================================================
          if (toolCalls.length > 0) {
              console.log("4️⃣  Executing search...\n");
              const toolResults = [];
              for (const toolCall of toolCalls) {
                  console.log(`🔍 ${toolCall.name}(${JSON.stringify(toolCall.arguments)})`);
                  if (!toolCall.invoke) {
                      console.log(`   ⚠️ No handler found for tool "${toolCall.name}"`);
                      continue;
                  }
                  // Use invoke() - automatically routes to the correct MCP client!
                  const mcpResult = await toolCall.invoke();
                  // Parse and clean up the search results
                  const cleanResult = parseSearchResults(mcpResult);
                  console.log(`   ✓ Got search results:`);
                  console.log(cleanResult
                      .split("\n")
                      .map((l) => `      ${l}`)
                      .join("\n"));
                  console.log();
                  toolResults.push({ id: toolCall.id, result: cleanResult });
              }
              // ============================================================
              // STEP 5: Continue with search results
              // ============================================================
              console.log("5️⃣  Getting AI response with search results...\n");
              history.push({
                  role: "assistant",
                  content: await result.text,
              });
              for (const tr of toolResults) {
                  history.push({
                      role: "tool",
                      content: tr.result,
                  });
              }
              console.log("🤖 Final Response:");
              const finalResult = completion({
                  modelId,
                  history,
                  stream: true,
                  mcp: [{ client: mcpClient, includeResources: false }],
              });
              for await (const token of finalResult.tokenStream) {
                  process.stdout.write(token);
              }
              console.log("\n");
          }
          // ============================================================
          // Cleanup
          // ============================================================
          console.log("6️⃣  Cleaning up...");
          await unloadModel({ modelId, clearStorage: false });
          console.log("   ✓ Done\n");
          console.log("🎉 Example completed!");
          process.exit(0);
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      finally {
          if (mcpClient) {
              try {
                  await mcpClient.close();
              }
              catch {
                  // Ignore close errors
              }
          }
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/mcp-websearch.ts title="completion-mcp.ts" lineNumbers
      /**
       * MCP DuckDuckGo Search Example
       *
       * A web search example using DuckDuckGo - no API key required!
       * The server provides tools to search the web and get answers.
       *
       * Prerequisites:
       * - Install MCP SDK: bun add @modelcontextprotocol/sdk
       *
       * Run with: bun run examples/mcp-websearch.ts
       */

      import {
        completion,
        loadModel,
        unloadModel,
        QWEN3_1_7B_INST_Q4,
      } from "@/index";

      // MCP SDK is a user-installed optional dependency
      // Install with: bun add @modelcontextprotocol/sdk
      // eslint-disable-next-line import/no-unresolved
      import { Client } from "@modelcontextprotocol/sdk/client/index.js";
      // eslint-disable-next-line import/no-unresolved
      import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

      // ============================================================
      // Helper: Parse MCP search results into clean format for LLM
      // ============================================================
      type SearchResult = {
        title: string;
        url: string;
        snippet: string;
      };

      type McpContent = {
        type: string;
        text?: string;
      };

      type McpToolResult = {
        content: McpContent[];
      };

      type RawSearchResult = {
        title?: string;
        url?: string;
        snippet?: string;
        Description?: string;
      };

      function parseSearchResults(mcpResult: unknown): string {
        try {
          const result = mcpResult as McpToolResult;

          // Extract text content from MCP response
          const textContent = result.content?.find((c) => c.type === "text");
          if (!textContent?.text) {
            return JSON.stringify(mcpResult);
          }

          // Parse the JSON array of search results
          const rawResults = JSON.parse(textContent.text) as RawSearchResult[];

          // Extract just the useful fields (title, url, snippet)
          const cleanResults: SearchResult[] = rawResults.slice(0, 5).map((r) => ({
            title: r.title ?? "Unknown",
            url: r.url ?? "",
            snippet: r.snippet ?? "",
          }));

          // Format as concise text for LLM
          return cleanResults
            .map(
              (r, i) => `[${i + 1}] ${r.title}\n    URL: ${r.url}\n    ${r.snippet}`,
            )
            .join("\n\n");
        } catch {
          // If parsing fails, return a truncated version
          const str =
            typeof mcpResult === "string" ? mcpResult : JSON.stringify(mcpResult);
          return str.slice(0, 2000);
        }
      }

      let mcpClient: Client | null = null;

      try {
        console.log("🦆 MCP DuckDuckGo Search Example\n");

        // ============================================================
        // STEP 1: Connect to DuckDuckGo MCP server
        // ============================================================
        console.log("1️⃣  Starting DuckDuckGo MCP server...");

        mcpClient = new Client({
          name: "qvac-ddg-example",
          version: "1.0.0",
        });

        const transport = new StdioClientTransport({
          command: "npx",
          args: ["-y", "@oevortex/ddg_search"],
        });

        await mcpClient.connect(transport);
        console.log("   ✓ MCP server connected\n");

        // ============================================================
        // STEP 2: Load model
        // ============================================================
        console.log("2️⃣  Loading model...");
        const modelId = await loadModel({
          modelSrc: QWEN3_1_7B_INST_Q4,
          modelConfig: {
            ctx_size: 4096,
            tools: true,
          },
          onProgress: (progress) =>
            process.stdout.write(`\r   Loading: ${progress.percentage.toFixed(1)}%`),
        });
        console.log(`\n   ✓ Model loaded\n`);

        // ============================================================
        // STEP 3: Ask AI to search the web (with MCP client)
        // ============================================================
        const history = [
          {
            role: "system",
            content: `You are a helpful assistant with access to web search.
      Use the search tool when you need current information.
      Always cite your sources with the URL.`,
          },
          {
            role: "user",
            content: "What is the current weather in New York City?",
          },
        ];

        console.log("3️⃣  Asking AI to search the web...\n");
        console.log("🤖 AI Response:");

        // Pass MCP client directly to completion - tools are adapted internally!
        const result = completion({
          modelId,
          history,
          stream: true,
          mcp: [{ client: mcpClient, includeResources: false }],
        });

        for await (const token of result.tokenStream) {
          process.stdout.write(token);
        }

        const toolCalls = await result.toolCalls;
        console.log("\n");

        // ============================================================
        // STEP 4: Execute tool calls using call() - automatic MCP routing!
        // ============================================================
        if (toolCalls.length > 0) {
          console.log("4️⃣  Executing search...\n");

          const toolResults: Array<{ id: string; result: string }> = [];

          for (const toolCall of toolCalls) {
            console.log(`🔍 ${toolCall.name}(${JSON.stringify(toolCall.arguments)})`);

            if (!toolCall.invoke) {
              console.log(`   ⚠️ No handler found for tool "${toolCall.name}"`);
              continue;
            }

            // Use invoke() - automatically routes to the correct MCP client!
            const mcpResult = await toolCall.invoke();

            // Parse and clean up the search results
            const cleanResult = parseSearchResults(mcpResult);

            console.log(`   ✓ Got search results:`);
            console.log(
              cleanResult
                .split("\n")
                .map((l) => `      ${l}`)
                .join("\n"),
            );
            console.log();

            toolResults.push({ id: toolCall.id, result: cleanResult });
          }

          // ============================================================
          // STEP 5: Continue with search results
          // ============================================================
          console.log("5️⃣  Getting AI response with search results...\n");

          history.push({
            role: "assistant",
            content: await result.text,
          });

          for (const tr of toolResults) {
            history.push({
              role: "tool",
              content: tr.result,
            });
          }

          console.log("🤖 Final Response:");
          const finalResult = completion({
            modelId,
            history,
            stream: true,
            mcp: [{ client: mcpClient, includeResources: false }],
          });

          for await (const token of finalResult.tokenStream) {
            process.stdout.write(token);
          }
          console.log("\n");
        }

        // ============================================================
        // Cleanup
        // ============================================================
        console.log("6️⃣  Cleaning up...");
        await unloadModel({ modelId, clearStorage: false });
        console.log("   ✓ Done\n");

        console.log("🎉 Example completed!");
        process.exit(0);
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      } finally {
        if (mcpClient) {
          try {
            await mcpClient.close();
          } catch {
            // Ignore close errors
          }
        }
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

### KV cache

The following script enables `kvCache: true` to speed up follow-up turns, and then compares it with `kvCache: false` on the same history:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/kv-cache-example.js title="completion-kv-cache.js" lineNumbers
      import { completion, LLAMA_3_2_1B_INST_Q4_0, loadModel, unloadModel, VERBOSITY, } from "@qvac/sdk";
      try {
          // Load the model
          const modelId = await loadModel({
              modelSrc: LLAMA_3_2_1B_INST_Q4_0,
              modelConfig: {
                  device: "gpu",
                  ctx_size: 2048,
                  verbosity: VERBOSITY.ERROR,
              },
          });
          console.log("🧠 Testing KV Cache functionality...\n");
          // First conversation with auto-keyed cache enabled
          console.log("📝 First conversation (building cache for the next turn):");
          const history1 = [
              { role: "user", content: "What is the capital of France?" },
          ];
          const result1 = completion({
              modelId,
              history: history1,
              stream: true,
              kvCache: true,
          }); // kvCache = true
          for await (const token of result1.tokenStream) {
              process.stdout.write(token);
          }
          const final1 = await result1.final;
          const stats1 = final1.stats;
          console.log(`\n⏱️  First completion stats: ${JSON.stringify(stats1)}\n`);
          // Continue conversation (should reuse the completed first-turn cache).
          console.log("🔄 Continuing conversation (reusing previous turn cache):");
          const history2 = [
              { role: "user", content: "What is the capital of France?" },
              {
                  role: "assistant",
                  content: final1.cacheableAssistantContent ?? final1.contentText,
              },
              { role: "user", content: "What about Germany?" },
          ];
          // Auto-keyed caching should:
          // 1. Find the cache saved after turn 1 under [user, assistant]
          // 2. Load that cache and process only the new "What about Germany?" user turn
          // 3. Save the updated cache and rename it to include the new assistant response
          const result2 = completion({
              modelId,
              history: history2,
              stream: true,
              kvCache: true,
          }); // kvCache = true
          for await (const token of result2.tokenStream) {
              process.stdout.write(token);
          }
          const stats2 = await result2.stats;
          console.log(`\n⏱️  Second completion stats: ${JSON.stringify(stats2)}\n`);
          // Compare with non-cached version
          console.log("🚀 Same conversation without cache:");
          const result3 = completion({
              modelId,
              history: history2,
              stream: true,
              kvCache: false,
          }); // kvCache = false
          for await (const token of result3.tokenStream) {
              process.stdout.write(token);
          }
          const stats3 = await result3.stats;
          console.log(`\n⏱️  Non-cached completion stats: ${JSON.stringify(stats3)}\n`);
          console.log("✅ KV Cache test completed!");
          await unloadModel({ modelId, clearStorage: false });
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/kv-cache-example.ts title="completion-kv-cache.ts" lineNumbers
      import {
        completion,
        LLAMA_3_2_1B_INST_Q4_0,
        loadModel,
        unloadModel,
        VERBOSITY,
      } from "@qvac/sdk";

      try {
        // Load the model
        const modelId = await loadModel({
          modelSrc: LLAMA_3_2_1B_INST_Q4_0,
          modelConfig: {
            device: "gpu",
            ctx_size: 2048,
            verbosity: VERBOSITY.ERROR,
          },
        });

        console.log("🧠 Testing KV Cache functionality...\n");

        // First conversation with auto-keyed cache enabled
        console.log("📝 First conversation (building cache for the next turn):");
        const history1 = [
          { role: "user", content: "What is the capital of France?" },
        ];

        const result1 = completion({
          modelId,
          history: history1,
          stream: true,
          kvCache: true,
        }); // kvCache = true

        for await (const token of result1.tokenStream) {
          process.stdout.write(token);
        }

        const final1 = await result1.final;
        const stats1 = final1.stats;
        console.log(`\n⏱️  First completion stats: ${JSON.stringify(stats1)}\n`);

        // Continue conversation (should reuse the completed first-turn cache).
        console.log("🔄 Continuing conversation (reusing previous turn cache):");
        const history2 = [
          { role: "user", content: "What is the capital of France?" },
          {
            role: "assistant",
            content: final1.cacheableAssistantContent ?? final1.contentText,
          },
          { role: "user", content: "What about Germany?" },
        ];

        // Auto-keyed caching should:
        // 1. Find the cache saved after turn 1 under [user, assistant]
        // 2. Load that cache and process only the new "What about Germany?" user turn
        // 3. Save the updated cache and rename it to include the new assistant response
        const result2 = completion({
          modelId,
          history: history2,
          stream: true,
          kvCache: true,
        }); // kvCache = true

        for await (const token of result2.tokenStream) {
          process.stdout.write(token);
        }

        const stats2 = await result2.stats;
        console.log(`\n⏱️  Second completion stats: ${JSON.stringify(stats2)}\n`);

        // Compare with non-cached version
        console.log("🚀 Same conversation without cache:");
        const result3 = completion({
          modelId,
          history: history2,
          stream: true,
          kvCache: false,
        }); // kvCache = false

        for await (const token of result3.tokenStream) {
          process.stdout.write(token);
        }

        const stats3 = await result3.stats;
        console.log(`\n⏱️  Non-cached completion stats: ${JSON.stringify(stats3)}\n`);

        console.log("✅ KV Cache test completed!");

        await unloadModel({ modelId, clearStorage: false });
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>


Text embeddings

# Text embeddings (/ai-capabilities/text-embeddings)



## Overview

Text embeddings uses [`qvac-fabric-llm.cpp`](https://github.com/tetherto/qvac-fabric-llm.cpp) as inference engine. Load any supported model using `modelType: "embeddings"`. Then, provide text input as `text` where the value is either a single `string` or an array of strings.

`embed()` returns a single embedding vector (`number[]`) for single text input, or an array of embedding vectors (`number[][]`) for batch input.

## Functions

Use the following sequence of function calls:

1. [`loadModel()`](/reference/api#loadmodel)
2. [`embed()`](/reference/api#embed)
3. [`unloadModel()`](/reference/api#unloadmodel)

For how to use each function, see [SDK — API reference](/reference/api/).

## Models

You can load any [`llama.cpp`](https://github.com/ggml-org/llama.cpp)-compatible embeddings model. Model file format: `*.gguf`.

* If the model is sharded across multiple files (a multi-file bundle), see [Sharded models](/models/sharded-models).
* For models available as constants, see [SDK — Models](/introduction#models).

## Example

The following script shows an example of embedding:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/embed-p2p.js title="text-embeddings.js" lineNumbers
      import { embed, GTE_LARGE_FP16, loadModel, unloadModel } from "@qvac/sdk";
      function cosineSimilarity(vecA, vecB) {
          let dotProduct = 0;
          for (let i = 0; i < vecA.length; i++) {
              dotProduct += vecA[i] * vecB[i];
          }
          return dotProduct;
      }
      try {
          const modelId = await loadModel({
              modelSrc: GTE_LARGE_FP16,
              onProgress: (progress) => {
                  console.log(progress);
              },
              modelConfig: {
                  gpuLayers: 99,
                  device: "gpu",
              },
          });
          console.log("\n📝 Example 1: Single Text Embedding");
          console.log("=".repeat(50));
          const { embedding: singleEmbedding } = await embed({
              modelId,
              text: "Hello, world!",
          });
          console.log("Input: 'Hello, world!'");
          console.log("Embedding dimensions:", singleEmbedding.length);
          console.log("First 10 values:", singleEmbedding.slice(0, 10));
          console.log("\n📝 Example 2: Batch Text Embeddings");
          console.log("=".repeat(50));
          const texts = [
              "The quick brown fox jumps over the lazy dog",
              "A fast auburn fox leaps over a sleepy canine",
              "Python is a programming language",
          ];
          const { embedding: batchEmbeddings } = await embed({ modelId, text: texts });
          console.log("Input: Array of", texts.length, "texts");
          console.log("Output: Array of", batchEmbeddings.length, "embeddings");
          const [emb1, emb2, emb3] = batchEmbeddings;
          if (!emb1 || !emb2 || !emb3) {
              throw new Error("Expected 3 embeddings");
          }
          console.log("Each embedding dimensions:", emb1.length);
          console.log("\n🔍 Similarity Analysis");
          console.log("=".repeat(50));
          const similarity1 = cosineSimilarity(emb1, emb2);
          const similarity2 = cosineSimilarity(emb1, emb3);
          console.log("Similarity between texts 1 and 2 (similar meaning):", similarity1.toFixed(4));
          console.log("Similarity between texts 1 and 3 (different topics):", similarity2.toFixed(4));
          console.log("\n💡 Higher values indicate more similar meanings");
          await unloadModel({ modelId, clearStorage: false });
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/embed-p2p.ts title="text-embeddings.ts" lineNumbers
      import { embed, GTE_LARGE_FP16, loadModel, unloadModel } from "@qvac/sdk";

      function cosineSimilarity(vecA: number[], vecB: number[]) {
        let dotProduct = 0;
        for (let i = 0; i < vecA.length; i++) {
          dotProduct += vecA[i]! * vecB[i]!;
        }
        return dotProduct;
      }

      try {
        const modelId = await loadModel({
          modelSrc: GTE_LARGE_FP16,
          onProgress: (progress) => {
            console.log(progress);
          },
          modelConfig: {
            gpuLayers: 99,
            device: "gpu",
          },
        });

        console.log("\n📝 Example 1: Single Text Embedding");
        console.log("=".repeat(50));

        const { embedding: singleEmbedding } = await embed({
          modelId,
          text: "Hello, world!",
        });

        console.log("Input: 'Hello, world!'");
        console.log("Embedding dimensions:", singleEmbedding.length);
        console.log("First 10 values:", singleEmbedding.slice(0, 10));

        console.log("\n📝 Example 2: Batch Text Embeddings");
        console.log("=".repeat(50));

        const texts = [
          "The quick brown fox jumps over the lazy dog",
          "A fast auburn fox leaps over a sleepy canine",
          "Python is a programming language",
        ];

        const { embedding: batchEmbeddings } = await embed({ modelId, text: texts });

        console.log("Input: Array of", texts.length, "texts");
        console.log("Output: Array of", batchEmbeddings.length, "embeddings");

        const [emb1, emb2, emb3] = batchEmbeddings;

        if (!emb1 || !emb2 || !emb3) {
          throw new Error("Expected 3 embeddings");
        }

        console.log("Each embedding dimensions:", emb1.length);

        console.log("\n🔍 Similarity Analysis");
        console.log("=".repeat(50));

        const similarity1 = cosineSimilarity(emb1, emb2);
        const similarity2 = cosineSimilarity(emb1, emb3);

        console.log(
          "Similarity between texts 1 and 2 (similar meaning):",
          similarity1.toFixed(4),
        );
        console.log(
          "Similarity between texts 1 and 3 (different topics):",
          similarity2.toFixed(4),
        );
        console.log("\n💡 Higher values indicate more similar meanings");

        await unloadModel({ modelId, clearStorage: false });
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>


Rag

# RAG (/ai-capabilities/rag)



## Overview

RAG (retrieval-augmented generation) uses [text embeddings](/ai-capabilities/text-embeddings): you embed (vectorize) documents, store them in a vector DB, and later retrieve the most relevant chunks for a query using similarity search.

Compared to generating text embeddings only, the key differences are:

* You must **persist embeddings** (vectors) alongside the original text (and optional metadata) in a vector DB.
* At query time, you **embed the query** and run **top‑K** vector search to fetch the most relevant documents/chunks.
* You *typically* pass the retrieved text to [`completion()`](/reference/api#completion) as context to ground the model's answer (this retrieval step is what makes it RAG).

Note that you should bring your own vector DB (e.g., HyperDB, LanceDB, ChromaDB, SQLite-Vector, etc.).

## Functions

1. [`loadModel()`](/reference/api#loadmodel) (with `modelType: "embeddings"`)
2. [`embed()`](/reference/api#embed) — generate vectors
3. Use any combination of the RAG functions below as needed:
   * [`ragChunk()`](/reference/api#ragchunk) — chunk documents
   * [`ragIngest()`](/reference/api#ragingest) — embed and store (requires model)
   * [`ragSaveEmbeddings()`](/reference/api#ragsaveembeddings) — save pre-computed vectors
   * [`ragSearch()`](/reference/api#ragsearch) — query similar documents (requires model)
   * [`ragReindex()`](/reference/api#ragreindex) — optimize search index
   * [`ragDeleteEmbeddings()`](/reference/api#ragdeleteembeddings) — remove documents
   * [`ragListWorkspaces()`](/reference/api#raglistworkspaces) — list workspaces
   * [`ragCloseWorkspace()`](/reference/api#ragcloseworkspace) — release resources
   * [`ragDeleteWorkspace()`](/reference/api#ragdeleteworkspace) — delete workspace and data
4. [`unloadModel()`](/reference/api#unloadmodel)

For how to use each function, see [SDK — API reference](/reference/api/).

## Pipeline

Create your RAG pipeline using [text embeddings](/ai-capabilities/text-embeddings) and [completion](/ai-capabilities/text-generation).

<Callout type="info">
  **Important:** make sure your vector DB schema matches the embedding dimensionality produced by your model (e.g., GTE Large embeddings used in the example are 1024‑dimensional).
</Callout>

## Example

The following script shows a RAG-style workflow using an embeddings model plus an in-memory SQLite vector index:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/rag/rag-sqlite.js title="rag.js" lineNumbers
      import { embed, loadModel, unloadModel, GTE_LARGE_FP16 } from "@qvac/sdk";
      import sqlite3InitModule from "@sqliteai/sqlite-wasm";
      try {
          // Get query from command line or use default
          const query = process.argv[2] || "machine learning algorithms";
          console.log(`🔍 Query: "${query}"`);
          // Initialize SQLite with vector extension
          const sqlite3 = await sqlite3InitModule();
          const db = new sqlite3.oo1.DB(":memory:", "c");
          const modelId = await loadModel({
              modelSrc: GTE_LARGE_FP16,
              onProgress: (progress) => {
                  console.log(`Loading model... ${progress.percentage.toFixed(1)}%`);
              },
          });
          const samples = [
              {
                  id: 1,
                  text: "Machine learning is a subset of artificial intelligence that focuses on algorithms that can learn and make predictions from data without being explicitly programmed for every task.",
              },
              {
                  id: 2,
                  text: "Deep learning uses neural networks with multiple layers to process and learn from complex data patterns, enabling breakthroughs in image recognition and natural language processing.",
              },
              {
                  id: 3,
                  text: "Natural language processing combines computational linguistics with machine learning to help computers understand, interpret, and generate human language in a meaningful way.",
              },
              {
                  id: 4,
                  text: "Computer vision enables machines to interpret and understand visual information from the world, using techniques like image classification, object detection, and facial recognition.",
              },
              {
                  id: 5,
                  text: "Quantum computing leverages quantum mechanical phenomena to process information in fundamentally different ways than classical computers, potentially solving certain problems exponentially faster.",
              },
              {
                  id: 6,
                  text: "Blockchain technology creates decentralized, immutable ledgers that enable secure peer-to-peer transactions without requiring a central authority or intermediary.",
              },
              {
                  id: 7,
                  text: "Cloud computing delivers computing services over the internet, allowing users to access resources like storage, processing power, and applications on-demand from anywhere.",
              },
              {
                  id: 8,
                  text: "Cybersecurity protects digital systems, networks, and data from malicious attacks, unauthorized access, and various forms of cyber threats through multiple layers of defense.",
              },
          ];
          // Create table for documents with vector storage
          db.exec(`
        CREATE TABLE IF NOT EXISTS documents (
          id INTEGER PRIMARY KEY,
          text TEXT NOT NULL,
          embedding BLOB NOT NULL
        )
      `);
          console.log("📚 Embedding documents...");
          for (const sample of samples) {
              const { embedding } = await embed({ modelId, text: sample.text });
              db.exec({
                  sql: "INSERT INTO documents VALUES (?, ?, vector_as_f32(?))",
                  bind: [sample.id, sample.text, JSON.stringify(embedding)],
              });
          }
          // Initialize and optimize vector index
          db.exec(`SELECT vector_init('documents', 'embedding', 'type=FLOAT32,dimension=1024')`);
          // Quantize vectors
          db.exec(`SELECT vector_quantize('documents', 'embedding')`);
          // [Optional] Preload quantized vectors in memory for optimal performance
          db.exec(`SELECT vector_quantize_preload('documents', 'embedding')`);
          // Search for similar documents
          console.log("🔎 Searching for similar documents...");
          const { embedding: queryEmbedding } = await embed({ modelId, text: query });
          const results = [];
          // Perform vector search
          db.exec({
              sql: `
          SELECT d.id, d.text, v.distance 
          FROM documents d
          JOIN vector_quantize_scan('documents', 'embedding', vector_as_f32(?), 3) v
          ON d.id = v.rowid
        `,
              bind: [JSON.stringify(queryEmbedding)],
              rowMode: "object",
              callback: (row) => {
                  const typedRow = row;
                  results.push(typedRow);
              },
          });
          console.log("\n📋 Top 3 most similar documents:");
          results.forEach((result, index) => {
              console.log("=".repeat(50) + " Top result:");
              console.log(`\n${index + 1}. [ID: ${result.id}] (Score: ${result.distance.toFixed(4)})`);
              console.log(`   ${result.text}`);
              console.log("=".repeat(100));
              console.log();
          });
          await unloadModel({ modelId });
          db.close();
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/rag/rag-sqlite.ts title="rag.ts" lineNumbers
      import { embed, loadModel, unloadModel, GTE_LARGE_FP16 } from "@qvac/sdk";
      import sqlite3InitModule from "@sqliteai/sqlite-wasm";

      try {
        // Get query from command line or use default
        const query = process.argv[2] || "machine learning algorithms";
        console.log(`🔍 Query: "${query}"`);

        // Initialize SQLite with vector extension
        const sqlite3 = await sqlite3InitModule();
        const db = new sqlite3.oo1.DB(":memory:", "c");

        const modelId = await loadModel({
          modelSrc: GTE_LARGE_FP16,
          onProgress: (progress) => {
            console.log(`Loading model... ${progress.percentage.toFixed(1)}%`);
          },
        });

        const samples = [
          {
            id: 1,
            text: "Machine learning is a subset of artificial intelligence that focuses on algorithms that can learn and make predictions from data without being explicitly programmed for every task.",
          },
          {
            id: 2,
            text: "Deep learning uses neural networks with multiple layers to process and learn from complex data patterns, enabling breakthroughs in image recognition and natural language processing.",
          },
          {
            id: 3,
            text: "Natural language processing combines computational linguistics with machine learning to help computers understand, interpret, and generate human language in a meaningful way.",
          },
          {
            id: 4,
            text: "Computer vision enables machines to interpret and understand visual information from the world, using techniques like image classification, object detection, and facial recognition.",
          },
          {
            id: 5,
            text: "Quantum computing leverages quantum mechanical phenomena to process information in fundamentally different ways than classical computers, potentially solving certain problems exponentially faster.",
          },
          {
            id: 6,
            text: "Blockchain technology creates decentralized, immutable ledgers that enable secure peer-to-peer transactions without requiring a central authority or intermediary.",
          },
          {
            id: 7,
            text: "Cloud computing delivers computing services over the internet, allowing users to access resources like storage, processing power, and applications on-demand from anywhere.",
          },
          {
            id: 8,
            text: "Cybersecurity protects digital systems, networks, and data from malicious attacks, unauthorized access, and various forms of cyber threats through multiple layers of defense.",
          },
        ];

        // Create table for documents with vector storage
        db.exec(`
        CREATE TABLE IF NOT EXISTS documents (
          id INTEGER PRIMARY KEY,
          text TEXT NOT NULL,
          embedding BLOB NOT NULL
        )
      `);

        console.log("📚 Embedding documents...");
        for (const sample of samples) {
          const { embedding } = await embed({ modelId, text: sample.text });
          db.exec({
            sql: "INSERT INTO documents VALUES (?, ?, vector_as_f32(?))",
            bind: [sample.id, sample.text, JSON.stringify(embedding)],
          });
        }

        // Initialize and optimize vector index
        db.exec(
          `SELECT vector_init('documents', 'embedding', 'type=FLOAT32,dimension=1024')`,
        );

        // Quantize vectors
        db.exec(`SELECT vector_quantize('documents', 'embedding')`);

        // [Optional] Preload quantized vectors in memory for optimal performance
        db.exec(`SELECT vector_quantize_preload('documents', 'embedding')`);

        // Search for similar documents
        console.log("🔎 Searching for similar documents...");
        const { embedding: queryEmbedding } = await embed({ modelId, text: query });

        const results: Array<{
          id: number;
          text: string;
          distance: number;
        }> = [];

        // Perform vector search
        db.exec({
          sql: `
          SELECT d.id, d.text, v.distance 
          FROM documents d
          JOIN vector_quantize_scan('documents', 'embedding', vector_as_f32(?), 3) v
          ON d.id = v.rowid
        `,
          bind: [JSON.stringify(queryEmbedding)],
          rowMode: "object",
          callback: (row: unknown) => {
            const typedRow = row as { id: number; text: string; distance: number };
            results.push(typedRow);
          },
        });

        console.log("\n📋 Top 3 most similar documents:");
        results.forEach((result, index) => {
          console.log("=".repeat(50) + " Top result:");
          console.log(
            `\n${index + 1}. [ID: ${result.id}] (Score: ${result.distance.toFixed(4)})`,
          );
          console.log(`   ${result.text}`);
          console.log("=".repeat(100));
          console.log();
        });

        await unloadModel({ modelId });
        db.close();
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>


fine tunig

# Fine-tuning (/ai-capabilities/fine-tuning)



## Overview

Fine-tuning trains a [LoRA](https://arxiv.org/abs/2106.09685) (Low-Rank Adaptation) adapter on top of an LLM base model, to be used at inference time with [completion](/ai-capabilities/text-generation).

Load any supported LLM using `modelType: "llm"`. Then call `finetune()` with the dataset and training settings. Training can be done in two modes:

* [SFT](#sft): chat-based; enable with `assistantLossOnly: true`.
* [Causal](#causal): raw text; default (`assistantLossOnly: false`).

The output is a small `.gguf` adapter file that you can pass to `completion()` via `modelConfig.lora`.

## Functions

Use the following sequence of function calls:

1. [`loadModel()`](/reference/api#loadmodel)
2. [`finetune()`](/reference/api#finetune)
3. [`unloadModel()`](/reference/api#unloadmodel)

For how to use each function, see [SDK — API reference](/reference/api/).

## Models

You can fine-tune any [`llama.cpp`](https://github.com/ggml-org/llama.cpp)-compatible text-generation/chat model. Base model file format: `*.gguf`.

For models available as constants, see [SDK — Models](/introduction#models).

## Training

### SFT

Supervised fine-tuning (SFT) teaches the model how to respond to prompts. Use it for chat tuning, instruction following, or any task where you want to shape assistant responses.

**Dataset format:** JSONL where each line is a JSON object with a `messages` array. Supported roles: `system`, `user`, `assistant`, and `tool`. Example:

```jsonl
{"messages":[{"role":"system","content":"You are a helpful assistant."},{"role":"user","content":"What is 2+2?"},{"role":"assistant","content":"2+2 equals 4."}]}
{"messages":[{"role":"user","content":"What is the capital of France?"},{"role":"assistant","content":"The capital of France is Paris."}]}
```

### Causal

Causal fine-tuning adapts the model to a domain by training on raw text. Use it for domain adaptation, style transfer, or tasks where you want the model to better reflect specialized vocabulary, patterns, or tone.

**Dataset format:** plain text file. Example:

```
This is sample training text.
Another paragraph of content.
```

## Example

The following script loads an LLM, runs fine-tuning on a chat dataset with a separate eval file, and optionally demonstrates pause/resume when invoked with `--pause-resume`:

<WrapCode>
  ```ts title="llamacpp-finetune.ts" lineNumbers
  import {
    finetune,
    loadModel,
    QWEN3_600M_INST_Q4,
    unloadModel,
    type FinetuneHandle,
    type FinetuneResult,
    type FinetuneRunParams,
  } from "@qvac/sdk";

  const pauseResumeEnabled = process.argv.includes("--pause-resume");

  let modelId: string | undefined;
  let exitCode = 0;

  async function readProgress(
    handle: FinetuneHandle,
    onTick: (globalSteps: number) => void,
  ) {
    for await (const tick of handle.progressStream) {
      const phase = tick.is_train ? "train" : "val";
      console.log(
        `epoch=${tick.current_epoch + 1} step=${tick.global_steps} batch=${tick.current_batch}/${tick.total_batches} ${phase} loss=${tick.loss?.toFixed(4)} acc=${tick.accuracy?.toFixed(4)} eta=${Math.round(tick.eta_ms / 1000)}s`,
      );

      onTick(tick.global_steps);
    }
  }

  try {
    modelId = await loadModel({
      modelSrc: QWEN3_600M_INST_Q4,
      modelType: "llm",
      modelConfig: {
        device: "gpu",
        ctx_size: 512,
      },
    });

    console.log(`Model loaded with ID: ${modelId}`);
    const loadedModelId = modelId;

    const finetuneParams: FinetuneRunParams = {
      modelId: loadedModelId,
      options: {
        trainDatasetDir: "./examples/finetune/input/small_train_HF.jsonl",
        validation: {
          type: "dataset",
          path: "./examples/finetune/input/small_eval_HF.jsonl",
        },
        numberOfEpochs: 2,
        learningRate: 1e-4,
        lrMin: 1e-8,
        loraModules: "attn_q,attn_k,attn_v,attn_o,ffn_gate,ffn_up,ffn_down",
        assistantLossOnly: true,
        checkpointSaveSteps: 2,
        checkpointSaveDir: "./examples/finetune/results/checkpoints",
        outputParametersDir: "./examples/finetune/results",
      },
    };

    const handle = finetune(finetuneParams);
    let pauseRequested = false;
    let pauseResultPromise: Promise<FinetuneResult> | undefined;

    const progressTask = readProgress(handle, (globalSteps) => {
      if (pauseResumeEnabled && !pauseRequested && globalSteps >= 10) {
        pauseRequested = true;
        console.log("Requesting a pause so the run can be resumed...");
        pauseResultPromise = finetune({
          modelId: loadedModelId,
          operation: "pause",
        });
      }
    });

    const initialResult = await handle.result;
    await progressTask;

    if (pauseResultPromise) {
      await pauseResultPromise;
    }

    console.log("Initial finetune result:", initialResult);

    if (pauseResumeEnabled && initialResult.status === "PAUSED") {
      console.log("Resuming from the saved checkpoint...");

      const resumedHandle = finetune({
        ...finetuneParams,
        operation: "resume",
      });
      const resumedProgressTask = readProgress(resumedHandle, function () {});

      const resumedResult = await resumedHandle.result;
      await resumedProgressTask;

      console.log("Resumed finetune result:", resumedResult);
    }
  } catch (error) {
    console.error("Error:", error);
    exitCode = 1;
  } finally {
    if (modelId) {
      await unloadModel({ modelId, clearStorage: false });
    }
  }

  process.exit(exitCode);
  ```
</WrapCode>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>


Multimodal

# Multimodal (/ai-capabilities/multimodal)



## Overview

[Text generation](/ai-capabilities/text-generation) supports multimodal prompts. Multimodal lets you attach media files to inputs for [`completion()`](/reference/api#completion). You can include multiple attachments in the same request (e.g., to compare two images).

Compared to text-only completion inference, the key differences are:

* You must load a multimodal-capable LLM **and** its matching `projectionModelSrc` via [`loadModel()`](/reference/api#loadmodel).
* Your `history` messages can include `attachments: [{ path: "/path/to/image.jpg" }]` (the file must exist on disk).
* Aside from attachments, you still call `completion({ modelId, history, stream })` the same way and consume the same streaming output.

## Functions

Use the following sequence of function calls:

1. [`loadModel()`](/reference/api#loadmodel)
2. [`completion()`](/reference/api#completion)
3. [`unloadModel()`](/reference/api#unloadmodel)

For how to use each function, see [SDK — API reference](/reference/api/).

## Models

You should load two models:

* a `llama.cpp`-compatible multimodal-capable LLM. Model file format: `*.gguf`; and
* a matching projection model (`mmproj-*.gguf`). Model file format: `*.gguf`.

Recommended pairs:

* SmolVLM2 + mmproj-\*
* Qwen2.5-Omni + mmproj-\* (or Qwen3-VL + mmproj-\*)

For models available as constants, see [SDK — Models](/introduction#models).

## Example

The following script shows an example of multimodal completion with one image (and optionally two):

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/llamacpp-multimodal.js title="multimodal.js" lineNumbers
      import { completion, loadModel, SMOLVLM2_500M_MULTIMODAL_Q8_0, MMPROJ_SMOLVLM2_500M_MULTIMODAL_Q8_0, unloadModel, } from "@qvac/sdk";
      if (process.argv.length < 3) {
          console.error(`Specify an image file path as the first argument and a second image file path as the second (optional) argument`);
          process.exit(1);
      }
      try {
          // const modelPath = args[modelIndex + 1]!;
          const imageFilePath = process.argv[2];
          // Load the main model with projection in a single step
          const modelId = await loadModel({
              modelSrc: SMOLVLM2_500M_MULTIMODAL_Q8_0,
              modelConfig: {
                  ctx_size: 1024,
                  projectionModelSrc: MMPROJ_SMOLVLM2_500M_MULTIMODAL_Q8_0,
              },
              onProgress: (progress) => {
                  console.log(`Loading: ${progress.percentage.toFixed(1)}%`);
              },
          });
          //Using one particular media
          const history = [
              {
                  role: "user",
                  content: "What's in this image?",
                  attachments: [{ path: imageFilePath }],
              },
          ];
          const result = completion({ modelId, history, stream: true });
          for await (const token of result.tokenStream) {
              process.stdout.write(token);
          }
          const stats = await result.stats;
          console.log("\n📊 Performance Stats:", stats);
          console.log("--------------------------------");
          //Using multiple media
          if (process.argv.length < 4) {
              console.log(`Only one image provided, terminating`);
              process.exit(0);
          }
          const imageFilePath2 = process.argv[3];
          const history2 = [
              {
                  role: "user",
                  content: "Compare the two newspaper articles",
                  attachments: [{ path: imageFilePath }, { path: imageFilePath2 }],
              },
          ];
          const result2 = completion({ modelId, history: history2, stream: true });
          for await (const token of result2.tokenStream) {
              process.stdout.write(token);
          }
          const stats2 = await result2.stats;
          console.log("\n📊 Performance Stats:", stats2);
          console.log("--------------------------------");
          await unloadModel({ modelId, clearStorage: false });
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/llamacpp-multimodal.ts title="multimodal.ts" lineNumbers
      import {
        completion,
        loadModel,
        SMOLVLM2_500M_MULTIMODAL_Q8_0,
        MMPROJ_SMOLVLM2_500M_MULTIMODAL_Q8_0,
        unloadModel,
      } from "@qvac/sdk";

      if (process.argv.length < 3) {
        console.error(
          `Specify an image file path as the first argument and a second image file path as the second (optional) argument`,
        );
        process.exit(1);
      }

      try {
        // const modelPath = args[modelIndex + 1]!;
        const imageFilePath = process.argv[2]!;

        // Load the main model with projection in a single step
        const modelId = await loadModel({
          modelSrc: SMOLVLM2_500M_MULTIMODAL_Q8_0,
          modelConfig: {
            ctx_size: 1024,
            projectionModelSrc: MMPROJ_SMOLVLM2_500M_MULTIMODAL_Q8_0,
          },
          onProgress: (progress) => {
            console.log(`Loading: ${progress.percentage.toFixed(1)}%`);
          },
        });

        //Using one particular media
        const history = [
          {
            role: "user",
            content: "What's in this image?",
            attachments: [{ path: imageFilePath }],
          },
        ];
        const result = completion({ modelId, history, stream: true });

        for await (const token of result.tokenStream) {
          process.stdout.write(token);
        }

        const stats = await result.stats;

        console.log("\n📊 Performance Stats:", stats);

        console.log("--------------------------------");

        //Using multiple media
        if (process.argv.length < 4) {
          console.log(`Only one image provided, terminating`);
          process.exit(0);
        }

        const imageFilePath2 = process.argv[3]!;

        const history2 = [
          {
            role: "user",
            content: "Compare the two newspaper articles",
            attachments: [{ path: imageFilePath }, { path: imageFilePath2 }],
          },
        ];

        const result2 = completion({ modelId, history: history2, stream: true });

        for await (const token of result2.tokenStream) {
          process.stdout.write(token);
        }

        const stats2 = await result2.stats;

        console.log("\n📊 Performance Stats:", stats2);

        console.log("--------------------------------");

        await unloadModel({ modelId, clearStorage: false });
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>


Image generation

# Image generation (/ai-capabilities/image-generation)



## Overview

Image generation runs on a **customized Diffusion engine** ([`qvac-ext-stable-diffusion.cpp`](https://github.com/tetherto/qvac-ext-stable-diffusion.cpp)). Load a supported model using `modelType: "diffusion"`. Then, provide a text `prompt` describing the image to generate.

For image-to-image, also pass `init_image` (a `Uint8Array` of PNG or JPEG bytes) — the model transforms the input guided by the prompt instead of starting from noise. `diffusion()` returns one or more PNG images as `Uint8Array` buffers. Use `progressStream` to track generation progress step-by-step.

For higher-resolution outputs, you can chain a Real-ESRGAN upscaler. Either attach it as a post-processing step at load time and trigger it per generation via `diffusion({ upscale })`, or load an ESRGAN model standalone with `modelConfig.mode: "upscale"` and call `upscale()` on any PNG/JPEG buffer — generated or not. Both paths return PNG `Uint8Array` buffers and accept a `repeats` option that compounds the scale factor across sequential passes.

## Functions

Use the following sequence of function calls:

1. [`loadModel()`](/reference/api#loadmodel)
2. [`diffusion()`](/reference/api#diffusion) or `upscale()`
3. [`unloadModel()`](/reference/api#unloadmodel)

For how to use each function, see [SDK — API reference](/reference/api/).

## Models

Supported model families and their file layouts:

* **FLUX.2-klein**: split layout — diffusion model `*.gguf` + LLM text encoder `*.gguf` (via `llmModelSrc`) + VAE `*.safetensors` (via `vaeModelSrc`).
* **SD1.x, SD2.x**: single all-in-one `*.gguf` file. No companion files needed.
* **SDXL, SD3**: may require separate CLIP/T5 text encoder files (`clipLModelSrc`, `clipGModelSrc`, `t5XxlModelSrc`) in `modelConfig` depending on the model variant.
* **ESRGAN**: post-generation upscaler, `*.pth` format. Two ways to load:
  * **Paired with a diffusion model** — set `modelConfig.upscaler.model_src` at `loadModel()` time alongside the diffusion `modelSrc`.
  * **Standalone** — pass the ESRGAN model as the top-level `modelSrc` with `modelConfig.mode: "upscale"`.

For models available as constants, see [SDK — Models](/introduction#models).

<Callout type="info">
  **On upscaling:** ESRGAN can be used standalone via `modelConfig.mode: "upscale"` + `upscale()`, or optionally paired with any supported diffusion family to upscale generated images in the same call via `diffusion({ upscale })`. Available constants: `REALESRGAN_X4PLUS_ANIME_6B`, `REALESRGAN_X4PLUS`.
</Callout>

## Examples

### FLUX.2-klein

The following script shows text-to-image generation using FLUX.2-klein with its split-layout model (separate diffusion model, LLM text encoder, and VAE):

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/diffusion-flux2-klein.js title="diffusion-flux2-klein.js" lineNumbers
      import { loadModel, unloadModel, diffusion, FLUX_2_KLEIN_4B_Q4_0, FLUX_2_KLEIN_4B_VAE, QWEN3_4B_Q4_K_M, } from "@qvac/sdk";
      import fs from "fs";
      import path from "path";
      // FLUX.2 [klein] uses a split-layout: separate diffusion model + LLM text encoder + VAE
      const diffusionModelSrc = process.argv[2] || FLUX_2_KLEIN_4B_Q4_0;
      const llmModelSrc = process.argv[3] || QWEN3_4B_Q4_K_M;
      const vaeModelSrc = process.argv[4] || FLUX_2_KLEIN_4B_VAE;
      const prompt = process.argv[5] || "a futuristic city at sunset, photorealistic";
      const outputDir = process.argv[6] || ".";
      console.log("Loading FLUX.2 [klein] split-layout model...");
      const modelId = await loadModel({
          modelSrc: diffusionModelSrc,
          modelType: "sdcpp-generation",
          modelConfig: {
              device: "gpu",
              threads: 4,
              llmModelSrc,
              vaeModelSrc,
          },
          onProgress: (p) => console.log(`Loading: ${p.percentage.toFixed(1)}%`),
      });
      console.log(`Model loaded: ${modelId}`);
      console.log(`\nGenerating: "${prompt}"`);
      const { progressStream, outputs, stats } = diffusion({
          modelId,
          prompt,
          width: 512,
          height: 512,
          steps: 20,
          guidance: 3.5,
          cfg_scale: 1,
          seed: -1,
      });
      for await (const { step, totalSteps } of progressStream) {
          process.stdout.write(`\rStep ${step}/${totalSteps}`);
      }
      console.log();
      const buffers = await outputs;
      for (let i = 0; i < buffers.length; i++) {
          const outputPath = path.join(outputDir, `flux2_${i}.png`);
          fs.writeFileSync(outputPath, buffers[i]);
          console.log(`Saved: ${outputPath}`);
      }
      console.log("\nStats:", await stats);
      await unloadModel({ modelId, clearStorage: false });
      console.log("Done.");
      process.exit(0);
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/diffusion-flux2-klein.ts title="diffusion-flux2-klein.ts" lineNumbers
      import {
        loadModel,
        unloadModel,
        diffusion,
        FLUX_2_KLEIN_4B_Q4_0,
        FLUX_2_KLEIN_4B_VAE,
        QWEN3_4B_Q4_K_M,
      } from "@qvac/sdk";
      import fs from "fs";
      import path from "path";

      // FLUX.2 [klein] uses a split-layout: separate diffusion model + LLM text encoder + VAE
      const diffusionModelSrc = process.argv[2] || FLUX_2_KLEIN_4B_Q4_0;
      const llmModelSrc = process.argv[3] || QWEN3_4B_Q4_K_M;
      const vaeModelSrc = process.argv[4] || FLUX_2_KLEIN_4B_VAE;
      const prompt = process.argv[5] || "a futuristic city at sunset, photorealistic";
      const outputDir = process.argv[6] || ".";

      console.log("Loading FLUX.2 [klein] split-layout model...");

      const modelId = await loadModel({
        modelSrc: diffusionModelSrc,
        modelType: "sdcpp-generation",
        modelConfig: {
          device: "gpu",
          threads: 4,
          llmModelSrc,
          vaeModelSrc,
        },
        onProgress: (p) => console.log(`Loading: ${p.percentage.toFixed(1)}%`),
      });
      console.log(`Model loaded: ${modelId}`);

      console.log(`\nGenerating: "${prompt}"`);

      const { progressStream, outputs, stats } = diffusion({
        modelId,
        prompt,
        width: 512,
        height: 512,
        steps: 20,
        guidance: 3.5,
        cfg_scale: 1,
        seed: -1,
      });

      for await (const { step, totalSteps } of progressStream) {
        process.stdout.write(`\rStep ${step}/${totalSteps}`);
      }
      console.log();

      const buffers = await outputs;
      for (let i = 0; i < buffers.length; i++) {
        const outputPath = path.join(outputDir, `flux2_${i}.png`);
        fs.writeFileSync(outputPath, buffers[i]!);
        console.log(`Saved: ${outputPath}`);
      }

      console.log("\nStats:", await stats);
      await unloadModel({ modelId, clearStorage: false });
      console.log("Done.");
      process.exit(0);
      ```
    </WrapCode>
  </Tab>
</Tabs>

### Stable Diffusion

The following script shows a minimal text-to-image generation example using a single all-in-one SD 2.1 model:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/diffusion-simple.js title="diffusion-simple.js" lineNumbers
      import { loadModel, unloadModel, diffusion, SD_V2_1_1B_Q8_0 } from "@qvac/sdk";
      import fs from "fs";
      // Minimal diffusion example — single GGUF model, no companion files needed.
      // Works with SD 1.x / 2.x all-in-one models.
      const modelSrc = process.argv[2] || SD_V2_1_1B_Q8_0;
      const prompt = process.argv[3] || "a photo of a cat sitting on a windowsill";
      const modelId = await loadModel({
          modelSrc,
          modelType: "sdcpp-generation",
          modelConfig: { prediction: "v" },
      });
      const { outputs } = diffusion({ modelId, prompt });
      const buffers = await outputs;
      fs.writeFileSync("output.png", buffers[0]);
      console.log("Saved: output.png");
      await unloadModel({ modelId, clearStorage: false });
      process.exit(0);
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/diffusion-simple.ts title="diffusion-simple.ts" lineNumbers
      import { loadModel, unloadModel, diffusion, SD_V2_1_1B_Q8_0 } from "@qvac/sdk";
      import fs from "fs";

      // Minimal diffusion example — single GGUF model, no companion files needed.
      // Works with SD 1.x / 2.x all-in-one models.
      const modelSrc = process.argv[2] || SD_V2_1_1B_Q8_0;
      const prompt = process.argv[3] || "a photo of a cat sitting on a windowsill";

      const modelId = await loadModel({
        modelSrc,
        modelType: "sdcpp-generation",
        modelConfig: { prediction: "v" },
      });

      const { outputs } = diffusion({ modelId, prompt });
      const buffers = await outputs;

      fs.writeFileSync("output.png", buffers[0]!);
      console.log("Saved: output.png");

      await unloadModel({ modelId, clearStorage: false });
      process.exit(0);
      ```
    </WrapCode>
  </Tab>
</Tabs>

### Image-to-image

Pass `init_image` to transform an existing image guided by a text prompt. Behavior depends on the model family:

* **FLUX.2**: in-context conditioning. Requires `prediction: "flux2_flow"` in `modelConfig` at `loadModel()` time; `strength` is ignored on this path.
* **SD / SDXL / SD3**: SDEdit-style. Use `strength` to control how much the source is preserved (`0` = keep source, `1` = ignore source).

The following script loads FLUX.2-klein in split-layout and transforms an input image using in-context conditioning (`prediction: "flux2_flow"`):

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/diffusion-flux2-klein-img2img.js title="diffusion-flux2-klein-img2img.js" lineNumbers
      import { loadModel, unloadModel, diffusion, FLUX_2_KLEIN_4B_Q4_0, FLUX_2_KLEIN_4B_VAE, QWEN3_4B_Q4_K_M, } from "@qvac/sdk";
      import fs from "fs";
      import path from "path";
      // img2img with FLUX.2 [klein] split-layout — uses in-context conditioning ("flux2_flow").
      const inputPath = process.argv[2];
      const prompt = process.argv[3] || "oil painting style, vibrant colors";
      const outputDir = process.argv[4] || ".";
      const diffusionModelSrc = process.argv[5] || FLUX_2_KLEIN_4B_Q4_0;
      const llmModelSrc = process.argv[6] || QWEN3_4B_Q4_K_M;
      const vaeModelSrc = process.argv[7] || FLUX_2_KLEIN_4B_VAE;
      if (!inputPath) {
          console.error("❌ Error: input image path is required");
          console.error("Usage: bun run bare:example dist/examples/diffusion-flux2-klein-img2img.js <inputImage> [prompt] [outputDir] [diffusionModelSrc] [llmModelSrc] [vaeModelSrc]");
          process.exit(1);
      }
      try {
          console.log("Loading FLUX.2 [klein] split-layout model...");
          const modelId = await loadModel({
              modelSrc: diffusionModelSrc,
              modelType: "sdcpp-generation",
              modelConfig: {
                  device: "gpu",
                  threads: 4,
                  llmModelSrc,
                  vaeModelSrc,
                  prediction: "flux2_flow",
              },
              onProgress: (p) => console.log(`Loading: ${p.percentage.toFixed(1)}%`),
          });
          console.log(`Model loaded: ${modelId}`);
          const init_image = new Uint8Array(fs.readFileSync(inputPath));
          console.log(`\nTransforming "${inputPath}" with prompt: "${prompt}"`);
          const { progressStream, outputs, stats } = diffusion({
              modelId,
              prompt,
              init_image,
              steps: 20,
              guidance: 3.5,
              cfg_scale: 1,
              seed: -1,
          });
          for await (const { step, totalSteps } of progressStream) {
              process.stdout.write(`\rStep ${step}/${totalSteps}`);
          }
          console.log();
          const buffers = await outputs;
          for (let i = 0; i < buffers.length; i++) {
              const outputPath = path.join(outputDir, `flux2_img2img_${i}.png`);
              fs.writeFileSync(outputPath, buffers[i]);
              console.log(`Saved: ${outputPath}`);
          }
          console.log("\nStats:", await stats);
          await unloadModel({ modelId, clearStorage: false });
          console.log("Done.");
          process.exit(0);
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/diffusion-flux2-klein-img2img.ts title="diffusion-flux2-klein-img2img.ts" lineNumbers
      import {
        loadModel,
        unloadModel,
        diffusion,
        FLUX_2_KLEIN_4B_Q4_0,
        FLUX_2_KLEIN_4B_VAE,
        QWEN3_4B_Q4_K_M,
      } from "@qvac/sdk";
      import fs from "fs";
      import path from "path";

      // img2img with FLUX.2 [klein] split-layout — uses in-context conditioning ("flux2_flow").

      const inputPath = process.argv[2];
      const prompt = process.argv[3] || "oil painting style, vibrant colors";
      const outputDir = process.argv[4] || ".";
      const diffusionModelSrc = process.argv[5] || FLUX_2_KLEIN_4B_Q4_0;
      const llmModelSrc = process.argv[6] || QWEN3_4B_Q4_K_M;
      const vaeModelSrc = process.argv[7] || FLUX_2_KLEIN_4B_VAE;

      if (!inputPath) {
        console.error("❌ Error: input image path is required");
        console.error(
          "Usage: bun run bare:example dist/examples/diffusion-flux2-klein-img2img.js <inputImage> [prompt] [outputDir] [diffusionModelSrc] [llmModelSrc] [vaeModelSrc]",
        );
        process.exit(1);
      }

      try {
        console.log("Loading FLUX.2 [klein] split-layout model...");
        const modelId = await loadModel({
          modelSrc: diffusionModelSrc,
          modelType: "sdcpp-generation",
          modelConfig: {
            device: "gpu",
            threads: 4,
            llmModelSrc,
            vaeModelSrc,
            prediction: "flux2_flow",
          },
          onProgress: (p) => console.log(`Loading: ${p.percentage.toFixed(1)}%`),
        });
        console.log(`Model loaded: ${modelId}`);

        const init_image = new Uint8Array(fs.readFileSync(inputPath));
        console.log(`\nTransforming "${inputPath}" with prompt: "${prompt}"`);

        const { progressStream, outputs, stats } = diffusion({
          modelId,
          prompt,
          init_image,
          steps: 20,
          guidance: 3.5,
          cfg_scale: 1,
          seed: -1,
        });

        for await (const { step, totalSteps } of progressStream) {
          process.stdout.write(`\rStep ${step}/${totalSteps}`);
        }
        console.log();

        const buffers = await outputs;
        for (let i = 0; i < buffers.length; i++) {
          const outputPath = path.join(outputDir, `flux2_img2img_${i}.png`);
          fs.writeFileSync(outputPath, buffers[i]!);
          console.log(`Saved: ${outputPath}`);
        }

        console.log("\nStats:", await stats);
        await unloadModel({ modelId, clearStorage: false });
        console.log("Done.");
        process.exit(0);
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

### Upscaling

#### Post-processing

Pass `upscale` to `diffusion()` to upscale generated images in the same call. Requires `modelConfig.upscaler = { type: "esrgan", model_src, tile_size? }` at `loadModel()` time. Behavior depends on the value passed:

* `true` (or `{}` / `{ repeats: 1 }`): single pass at the model's native scale factor (e.g. `x4` for RealESRGAN\_x4plus).
* `{ repeats: N }`: N sequential passes — each pass multiplies the output dimensions by the model's scale factor (e.g. `repeats: 2` with an `x4` model → `x16`).
* When `batch_count > 1`, every output image is upscaled independently.

The following script loads SD 2.1 with an ESRGAN upscaler and generates both a single-pass (`x4`) and a two-pass (`x16`) upscale from the same prompt:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/diffusion-esrgan-upscale.js title="diffusion-esrgan-upscale.js" lineNumbers
      import { loadModel, unloadModel, diffusion, SD_V2_1_1B_Q8_0, REALESRGAN_X4PLUS_ANIME_6B, } from "@qvac/sdk";
      import fs from "fs";
      import path from "path";
      // ESRGAN upscale example.
      //
      // Usage:
      //   bun run examples/diffusion-esrgan-upscale.ts [esrganSrc] [prompt] [outputDir]
      const esrganArg = process.argv[2];
      const promptArg = process.argv[3];
      const outputDirArg = process.argv[4];
      const esrganModelSrc = esrganArg ?? REALESRGAN_X4PLUS_ANIME_6B;
      const prompt = promptArg ??
          "an illustrated red fox portrait, clean line art, soft watercolor background, detailed fur, crisp eyes";
      const negative_prompt = "blurry, low quality, watermark, text";
      const outputDir = outputDirArg ?? ".";
      const seed = 42;
      try {
          console.log("Loading SD 2.1 + ESRGAN upscaler...");
          const modelId = await loadModel({
              modelSrc: SD_V2_1_1B_Q8_0,
              modelConfig: {
                  prediction: "v",
                  upscaler: {
                      type: "esrgan",
                      model_src: esrganModelSrc,
                      tile_size: 128,
                  },
              },
              onProgress: (p) => console.log(`Loading: ${p.percentage.toFixed(1)}%`),
          });
          console.log(`Model loaded: ${modelId}`);
          // Source size is intentionally small — each ESRGAN repeat multiplies dimensions.
          const baseParams = {
              modelId,
              prompt,
              negative_prompt,
              width: 128,
              height: 128,
              steps: 5,
              cfg_scale: 7.5,
              seed,
          };
          console.log(`\nGenerating ESRGAN x4 upscale: "${prompt}"`);
          const single = diffusion({ ...baseParams, upscale: true });
          for await (const { step, totalSteps } of single.progressStream) {
              process.stdout.write(`\rStep ${step}/${totalSteps}\x1b[K`);
          }
          console.log();
          const singleBuffers = await single.outputs;
          for (let i = 0; i < singleBuffers.length; i++) {
              const out = path.join(outputDir, `sd2_esrgan_x4_seed${seed}_${i}.png`);
              fs.writeFileSync(out, singleBuffers[i]);
              console.log(`Saved: ${out}`);
          }
          console.log("Stats:", await single.stats);
          console.log("\nGenerating ESRGAN two-pass x16 upscale...");
          const twoPass = diffusion({ ...baseParams, upscale: { repeats: 2 } });
          for await (const { step, totalSteps } of twoPass.progressStream) {
              process.stdout.write(`\rStep ${step}/${totalSteps}\x1b[K`);
          }
          console.log();
          const twoPassBuffers = await twoPass.outputs;
          for (let i = 0; i < twoPassBuffers.length; i++) {
              const out = path.join(outputDir, `sd2_esrgan_x16_seed${seed}_${i}.png`);
              fs.writeFileSync(out, twoPassBuffers[i]);
              console.log(`Saved: ${out}`);
          }
          console.log("Stats:", await twoPass.stats);
          await unloadModel({ modelId, clearStorage: false });
          console.log("Done.");
          process.exit(0);
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/diffusion-esrgan-upscale.ts title="diffusion-esrgan-upscale.ts" lineNumbers
      import {
        loadModel,
        unloadModel,
        diffusion,
        SD_V2_1_1B_Q8_0,
        REALESRGAN_X4PLUS_ANIME_6B,
      } from "@qvac/sdk";
      import fs from "fs";
      import path from "path";

      // ESRGAN upscale example.
      //
      // Usage:
      //   bun run examples/diffusion-esrgan-upscale.ts [esrganSrc] [prompt] [outputDir]

      const esrganArg: string | undefined = process.argv[2];
      const promptArg: string | undefined = process.argv[3];
      const outputDirArg: string | undefined = process.argv[4];

      const esrganModelSrc = esrganArg ?? REALESRGAN_X4PLUS_ANIME_6B;

      const prompt =
        promptArg ??
        "an illustrated red fox portrait, clean line art, soft watercolor background, detailed fur, crisp eyes";
      const negative_prompt = "blurry, low quality, watermark, text";
      const outputDir = outputDirArg ?? ".";
      const seed = 42;

      try {
        console.log("Loading SD 2.1 + ESRGAN upscaler...");
        const modelId = await loadModel({
          modelSrc: SD_V2_1_1B_Q8_0,
          modelConfig: {
            prediction: "v",
            upscaler: {
              type: "esrgan",
              model_src: esrganModelSrc,
              tile_size: 128,
            },
          },
          onProgress: (p) => console.log(`Loading: ${p.percentage.toFixed(1)}%`),
        });
        console.log(`Model loaded: ${modelId}`);

        // Source size is intentionally small — each ESRGAN repeat multiplies dimensions.
        const baseParams = {
          modelId,
          prompt,
          negative_prompt,
          width: 128,
          height: 128,
          steps: 5,
          cfg_scale: 7.5,
          seed,
        };

        console.log(`\nGenerating ESRGAN x4 upscale: "${prompt}"`);
        const single = diffusion({ ...baseParams, upscale: true });
        for await (const { step, totalSteps } of single.progressStream) {
          process.stdout.write(`\rStep ${step}/${totalSteps}\x1b[K`);
        }
        console.log();

        const singleBuffers = await single.outputs;
        for (let i = 0; i < singleBuffers.length; i++) {
          const out = path.join(outputDir, `sd2_esrgan_x4_seed${seed}_${i}.png`);
          fs.writeFileSync(out, singleBuffers[i]!);
          console.log(`Saved: ${out}`);
        }
        console.log("Stats:", await single.stats);

        console.log("\nGenerating ESRGAN two-pass x16 upscale...");
        const twoPass = diffusion({ ...baseParams, upscale: { repeats: 2 } });
        for await (const { step, totalSteps } of twoPass.progressStream) {
          process.stdout.write(`\rStep ${step}/${totalSteps}\x1b[K`);
        }
        console.log();

        const twoPassBuffers = await twoPass.outputs;
        for (let i = 0; i < twoPassBuffers.length; i++) {
          const out = path.join(outputDir, `sd2_esrgan_x16_seed${seed}_${i}.png`);
          fs.writeFileSync(out, twoPassBuffers[i]!);
          console.log(`Saved: ${out}`);
        }
        console.log("Stats:", await twoPass.stats);

        await unloadModel({ modelId, clearStorage: false });
        console.log("Done.");
        process.exit(0);
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

#### Standalone

The SDK also exposes `upscale()` — a standalone path that upscales any PNG/JPEG image without running diffusion. Load the ESRGAN model directly with `modelConfig.mode: "upscale"`:

```ts
const modelId = await loadModel(REALESRGAN_X4PLUS_ANIME_6B, {
  modelType: "diffusion",
  modelConfig: { mode: "upscale", upscaler: { tile_size: 128 } },
});
const { outputs } = upscale({ modelId, image: pngBytes, repeats: 2 });
const [upscaledPng] = await outputs;
```

`tile_size` defaults to 128. Increase it to reduce tile seams on large inputs, at the cost of more memory per pass.

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>


Video generation

# Video generation (/ai-capabilities/video-generation)



## Overview

Video generation runs on a **customized Diffusion engine** ([`qvac-ext-stable-diffusion.cpp`](https://github.com/tetherto/qvac-ext-stable-diffusion.cpp)). Load a supported model using `modelType: "diffusion"` with `modelConfig.mode: "video"`. Then call `video()` with `mode: "txt2vid"` and a text `prompt` describing the scene to animate.

`video()` returns `{ progressStream, outputs, stats }`. `outputs` resolves to one or more generated videos as `Uint8Array` buffers (AVI). Use `progressStream` to track generation step-by-step.

WAN-specific knobs control the output: `video_frames` (must satisfy `4k + 1`, e.g. `17`, `33`, `49`, `81`), `fps`, `cfg_scale`, and `flow_shift` (for Wan 2.1 T2V, `3.0` is recommended — higher values can produce near-static frames).

<Callout type="warn">
  Video generation is hardware-intensive: it requires at least **16 GB of video memory** or **20 GB of unified memory**.
</Callout>

## Functions

Use the following sequence of function calls:

1. [`loadModel()`](/reference/api#loadmodel)
2. [`video()`](/reference/api#video)
3. [`unloadModel()`](/reference/api#unloadmodel)

For how to use each function, see [SDK — API reference](/reference/api/).

## Models

Supported model families and their file layouts:

* **WAN 2.1 T2V**: split layout — diffusion model + UMT5-XXL text encoder (via `t5XxlModelSrc`) + VAE (via `vaeModelSrc`). Available constants: `WAN2_1_T2V_1_3B_FP16`, `UMT5_XXL_FP16`, `WAN_2_1_COMFYUI_REPACKAGED_VAE`.

For models available as constants, see [SDK — Models](/introduction#models).

## Example

### Text-to-video (WAN 2.1)

The following script shows text-to-video generation using Wan 2.1 T2V 1.3B with its split-layout model (separate diffusion model, UMT5-XXL text encoder, and VAE):

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/diffusion-txt2vid.js title="diffusion-txt2vid.js" lineNumbers
      import { loadModel, unloadModel, video, WAN2_1_T2V_1_3B_FP16, UMT5_XXL_FP16, WAN_2_1_COMFYUI_REPACKAGED_VAE, } from "@qvac/sdk";
      import fs from "fs";
      import path from "path";
      // Text-to-video with Wan 2.1 T2V 1.3B. Wan uses a split layout:
      // a diffusion model + a UMT5-XXL text encoder + a VAE.
      // This example needs powerful hardware: at least 16 GB of video memory or
      // 20 GB of unified memory.
      const diffusionModelSrc = process.argv[2] || WAN2_1_T2V_1_3B_FP16;
      const t5XxlModelSrc = process.argv[3] || UMT5_XXL_FP16;
      const vaeModelSrc = process.argv[4] || WAN_2_1_COMFYUI_REPACKAGED_VAE;
      // Prompt tip: Wan 1.3B is small and has weak temporal priors. Use motion-
      // explicit verbs and avoid static framing words like "standing", "still",
      // or "portrait" in the positive prompt.
      const prompt = process.argv[5] || "a colorful bird flapping its wings";
      const outputDir = process.argv[6] || ".";
      try {
          console.log("Loading Wan 2.1 T2V model (diffusion + UMT5-XXL + VAE)...");
          const modelId = await loadModel({
              modelSrc: diffusionModelSrc,
              modelType: "sdcpp-generation",
              modelConfig: {
                  mode: "video",
                  device: "gpu",
                  threads: 4,
                  t5XxlModelSrc,
                  vaeModelSrc,
                  diffusion_fa: true,
                  offload_to_cpu: true,
                  vae_on_cpu: true,
                  vae_tiling: true,
              },
              onProgress: (p) => console.log(`Loading: ${p.percentage.toFixed(1)}%`),
          });
          console.log(`Model loaded: ${modelId}`);
          console.log(`\nGenerating video for: "${prompt}"`);
          const { progressStream, outputs, stats } = video({
              modelId,
              mode: "txt2vid",
              prompt,
              negative_prompt: "blurry, low quality, static, jittery, watermark",
              width: 480,
              height: 832,
              // Frame count must satisfy (4*k + 1), k >= 1. Common values at 16 fps:
              // 17 frames ~= 1.06s (very fast, ~6 min on M3 Ultra Metal)
              // 33 frames ~= 2.06s (default in this example, ~11 min)
              // 49 frames ~= 3.06s (~17 min)
              // 65 frames ~= 4.06s (~22 min)
              // 81 frames ~= 5.06s (Wan 1.3B native training length, best motion
              // quality, ~28 min)
              // Going beyond 81 can degrade quality because it exceeds the model's
              // positional embeddings.
              video_frames: 33,
              fps: 16,
              steps: 30,
              cfg_scale: 6.0,
              // Wan 2.1 T2V needs flow_shift=3.0 for visible motion. Higher values can
              // make consecutive frames near-identical, which looks like a frozen video.
              flow_shift: 3.0,
              seed: 42,
              vae_tiling: true,
          });
          for await (const { step, totalSteps } of progressStream) {
              process.stdout.write(`\rStep ${step}/${totalSteps}`);
          }
          console.log();
          const buffers = await outputs;
          for (let i = 0; i < buffers.length; i++) {
              const outputPath = path.join(outputDir, `wan_t2v_${i}.avi`);
              fs.writeFileSync(outputPath, buffers[i]);
              console.log(`Saved: ${outputPath}`);
          }
          console.log("\nStats:", await stats);
          await unloadModel({ modelId, clearStorage: false });
          console.log("Done.");
          process.exit(0);
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/diffusion-txt2vid.ts title="diffusion-txt2vid.ts" lineNumbers
      import {
        loadModel,
        unloadModel,
        video,
        WAN2_1_T2V_1_3B_FP16,
        UMT5_XXL_FP16,
        WAN_2_1_COMFYUI_REPACKAGED_VAE,
      } from "@qvac/sdk";
      import fs from "fs";
      import path from "path";

      // Text-to-video with Wan 2.1 T2V 1.3B. Wan uses a split layout:
      // a diffusion model + a UMT5-XXL text encoder + a VAE.
      // This example needs powerful hardware: at least 16 GB of video memory or
      // 20 GB of unified memory.
      const diffusionModelSrc = process.argv[2] || WAN2_1_T2V_1_3B_FP16;
      const t5XxlModelSrc = process.argv[3] || UMT5_XXL_FP16;
      const vaeModelSrc = process.argv[4] || WAN_2_1_COMFYUI_REPACKAGED_VAE;

      // Prompt tip: Wan 1.3B is small and has weak temporal priors. Use motion-
      // explicit verbs and avoid static framing words like "standing", "still",
      // or "portrait" in the positive prompt.
      const prompt = process.argv[5] || "a colorful bird flapping its wings";
      const outputDir = process.argv[6] || ".";

      try {
        console.log("Loading Wan 2.1 T2V model (diffusion + UMT5-XXL + VAE)...");
        const modelId = await loadModel({
          modelSrc: diffusionModelSrc,
          modelType: "sdcpp-generation",
          modelConfig: {
            mode: "video",
            device: "gpu",
            threads: 4,
            t5XxlModelSrc,
            vaeModelSrc,
            diffusion_fa: true,
            offload_to_cpu: true,
            vae_on_cpu: true,
            vae_tiling: true,
          },
          onProgress: (p) => console.log(`Loading: ${p.percentage.toFixed(1)}%`),
        });
        console.log(`Model loaded: ${modelId}`);

        console.log(`\nGenerating video for: "${prompt}"`);

        const { progressStream, outputs, stats } = video({
          modelId,
          mode: "txt2vid",
          prompt,
          negative_prompt: "blurry, low quality, static, jittery, watermark",
          width: 480,
          height: 832,
          // Frame count must satisfy (4*k + 1), k >= 1. Common values at 16 fps:
          // 17 frames ~= 1.06s (very fast, ~6 min on M3 Ultra Metal)
          // 33 frames ~= 2.06s (default in this example, ~11 min)
          // 49 frames ~= 3.06s (~17 min)
          // 65 frames ~= 4.06s (~22 min)
          // 81 frames ~= 5.06s (Wan 1.3B native training length, best motion
          // quality, ~28 min)
          // Going beyond 81 can degrade quality because it exceeds the model's
          // positional embeddings.
          video_frames: 33,
          fps: 16,
          steps: 30,
          cfg_scale: 6.0,
          // Wan 2.1 T2V needs flow_shift=3.0 for visible motion. Higher values can
          // make consecutive frames near-identical, which looks like a frozen video.
          flow_shift: 3.0,
          seed: 42,
          vae_tiling: true,
        });

        for await (const { step, totalSteps } of progressStream) {
          process.stdout.write(`\rStep ${step}/${totalSteps}`);
        }
        console.log();

        const buffers = await outputs;
        for (let i = 0; i < buffers.length; i++) {
          const outputPath = path.join(outputDir, `wan_t2v_${i}.avi`);
          fs.writeFileSync(outputPath, buffers[i]!);
          console.log(`Saved: ${outputPath}`);
        }

        console.log("\nStats:", await stats);
        await unloadModel({ modelId, clearStorage: false });
        console.log("Done.");
        process.exit(0);
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>

Transcription

# Transcription (/ai-capabilities/transcription)



## Overview

Transcription uses your choice of either [`qvac-ext-lib-whisper.cpp`](https://github.com/tetherto/qvac-ext-lib-whisper.cpp) or [NVIDIA Parakeet](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3) (via the GGML-based [`parakeet-cpp`](https://github.com/tetherto/qvac-ext-lib-whisper.cpp/tree/main/parakeet-cpp) engine) as inference engine. Load a model using `modelType: "whisper"` for `qvac-ext-lib-whisper.cpp`, or `modelType: "parakeet"` for Parakeet. Parakeet supports multilingual transcription (TDT), english-only transcription (CTC), speaker diarization (Sortformer), and end-of-utterance detection (EOU) for duplex streaming.

Provide audio input as `audioChunk`, either as a file path (string) or an in-memory audio buffer.

`transcribe()` returns the full transcription as a single `string`. If you need partial results as they become available, use `transcribeStream()` to receive text chunks in real-time. Both whisper and parakeet expose duplex `transcribeStream()` sessions; see "Streaming with `transcribeStream()`" below.

## Functions

Use the following sequence of function calls:

1. [`loadModel()`](/reference/api#loadmodel)
2. [`transcribe()`](/reference/api#transcribe) or [`transcribeStream()`](/reference/api#transcribestream)
3. [`unloadModel()`](/reference/api#unloadmodel)

For how to use each function, see [SDK — API reference](/reference/api/).

## Models

### `qvac-ext-lib-whisper.cpp`

You should load two models:

* a [`whisper.cpp`](https://github.com/ggml-org/whisper.cpp)-compatible model for transcription. Model file format: `*.bin`; and
* a VAD model (e.g., Silero) converted to GGML. Model file format: `*.bin` *(optional, recommended)*.

### Parakeet

As of `@qvac/transcription-parakeet` 0.6.0, Parakeet ships as a **single GGUF** per variant — the addon auto-detects TDT / CTC / Sortformer / EOU from `parakeet.model.type` GGUF metadata. There is no `modelConfig.modelType` discriminator, no per-variant `parakeet*Src` artifact fields, and no `ParakeetArtifactsRequiredError`. Just supply the GGUF via the top-level `modelSrc`:

```ts
await loadModel({
  modelSrc: PARAKEET_TDT_0_6B_V3_Q8_0,    // multilingual, ~750MB
  modelType: "parakeet",
});

await loadModel({
  modelSrc: PARAKEET_CTC_0_6B_Q8_0,       // english-only, streaming-capable
  modelType: "parakeet",
});

await loadModel({
  modelSrc: PARAKEET_SORTFORMER_4SPK_V1_Q8_0,  // 4-speaker diarization
  modelType: "parakeet",
});

await loadModel({
  modelSrc: PARAKEET_EOU_120M_V1_Q8_0,    // end-of-utterance detection
  modelType: "parakeet",
});
```

For model artifacts available as constants, see [SDK — Models](/introduction#models).

<Callout type="info">
  **Migrating from pre-0.6 Parakeet (ONNX multi-file):** the legacy multi-file ONNX `modelConfig` shape (`parakeetEncoderSrc` / `parakeetDecoderSrc` / `parakeetVocabSrc` / `parakeetPreprocessorSrc`, plus `parakeetCtcModelSrc` / `parakeetTokenizerSrc` and `parakeetSortformerSrc` for the CTC/Sortformer variants) is no longer supported. Passing any of those fields raises a structured `LegacyParakeetModelDeprecatedError` with a migration message. The legacy ONNX constants (e.g. `PARAKEET_TDT_ENCODER_INT8`, `PARAKEET_CTC_FP32`, `PARAKEET_SORTFORMER_FP32`) remain exported for one minor cycle for codemod migrations only and will be removed in a future release.
</Callout>

<Callout type="info">
  **On VAD:** when using `qvac-ext-lib-whisper.cpp`, you can optionally provide a separate model for voice activity detection (VAD); this is recommended. In turn, Parakeet handles VAD internally, so no additional model or configuration is required.
</Callout>

## Streaming with `transcribeStream()`

`transcribeStream()` opens a duplex session for both engines — write audio chunks via `session.write(...)`, iterate events with `for await (const event of session) { ... }`. Events are typed as a discriminated union `{ type }`:

* `{ type: "text", text }` — incremental transcript text.
* `{ type: "segment", segment }` — segment metadata (whisper-only when `metadata: true`).
* `{ type: "vad", speaking, probability }` — voice-activity-detection state (whisper-only).
* `{ type: "endOfTurn", source: "whisper", silenceDurationMs }` — turn boundary detected from a measured silence window (whisper).
* `{ type: "endOfTurn", source: "parakeet" }` — turn boundary detected from the EOU model's `<EOU>` token (parakeet; no silence window — the event is token-driven).

The `source` field on `endOfTurn` lets consumers narrow the union: whisper events always carry a numeric `silenceDurationMs`; parakeet events never do.

<Callout type="info">
  **Wire compatibility:** post-0.6 servers emit `source` on every `endOfTurn` frame. SDK parsers still accept the legacy whisper wire shape `{ silenceDurationMs }` (no `source`) and normalize it to `source: "whisper"`. Upgrade client and server together when using parakeet `source: "parakeet"` events — older servers never emit that branch.
</Callout>

### Parakeet duplex streaming

Pass `parakeetStreamingConfig` to `transcribeStream()` to override per-call streaming knobs (each falls back to its `parakeetConfig.streaming*` load-time counterpart):

```ts
const session = await transcribeStream({
  modelId,
  parakeetStreamingConfig: {
    chunkMs: 1000,            // encoder cadence
    historyMs: 30000,         // sortformer rolling-history window
    leftContextMs: 500,       // ASR encoder left-context window
    rightLookaheadMs: 200,    // ASR encoder right-lookahead window
    emitPartials: true,       // emit partial segments before chunk boundaries
    emitEnergyVad: false,     // CTC/TDT energy-based VAD hint (engine-internal)
  },
});

for await (const event of session) {
  switch (event.type) {
    case "text":
      process.stdout.write(event.text);
      break;
    case "endOfTurn":
      // event.source: "whisper" | "parakeet"
      console.log("\n[endOfTurn] turn boundary detected\n");
      break;
  }
}
```

The synthetic `{ type: "endOfTurn", source: "parakeet" }` event surfaces whenever the EOU model emits an `<EOU>` token, and is the parakeet equivalent of whisper's silence-window EOU. Pair it with the `PARAKEET_EOU_120M_V1_Q8_0` checkpoint when you need explicit turn boundaries from parakeet.

## Examples

### `qvac-ext-lib-whisper.cpp`

The following script shows an example of `qvac-ext-lib-whisper.cpp` transcription with prompt-guided decoding, VAD, and GPU acceleration:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/transcription/whispercpp-prompt.js title="whispercpp-prompt.js" lineNumbers
      /**
       * Whisper transcription with prompt example.
       *
       * Usage:
       *   bun examples/transcription/whispercpp-prompt.ts
       *
       * This example requires a test audio file (default: examples/audio/sample-16khz.wav).
       * Sample audio files are available in the QVAC source repository, but not included in the published npm package.
       * Set audioChunk to a custom WAV, or download the default audio into examples/audio/:
       *   https://github.com/tetherto/qvac/blob/main/packages/sdk/examples/audio/sample-16khz.wav
       */
      import { loadModel, unloadModel, transcribe, WHISPER_TINY } from "@qvac/sdk";
      try {
          console.log("🎤 Starting Whisper transcription with prompt example...");
          // Load the Whisper model
          console.log("📥 Loading Whisper model...");
          const modelId = await loadModel({
              modelSrc: WHISPER_TINY,
              modelConfig: {
                  audio_format: "f32le",
                  // Sampling strategy
                  strategy: "greedy",
                  n_threads: 4,
                  // Transcription options
                  language: "en",
                  translate: false,
                  no_timestamps: false,
                  single_segment: false,
                  print_timestamps: true,
                  token_timestamps: true,
                  // Quality settings
                  temperature: 0.0,
                  suppress_blank: true,
                  suppress_nst: true,
                  // Advanced tuning
                  entropy_thold: 2.4,
                  logprob_thold: -1.0,
                  // VAD configuration
                  vad_params: {
                      threshold: 0.35,
                      min_speech_duration_ms: 200,
                      min_silence_duration_ms: 150,
                      max_speech_duration_s: 30.0,
                      speech_pad_ms: 600,
                      samples_overlap: 0.3,
                  },
                  // Context parameters for GPU
                  contextParams: {
                      use_gpu: true,
                      flash_attn: true,
                      gpu_device: 0,
                  },
              },
              onProgress: (progress) => {
                  console.log(progress);
              },
          });
          console.log(`✅ Whisper model loaded with ID: ${modelId}`);
          // Perform transcription
          console.log("🎧 Transcribing audio...");
          const text = await transcribe({
              modelId,
              audioChunk: "examples/audio/sample-16khz.wav",
              prompt: "This is a test recording with clear speech and proper punctuation.",
          });
          console.log("📝 Transcription result:");
          console.log(text);
          // Unload the model when done
          console.log("🧹 Unloading Whisper model...");
          await unloadModel({ modelId });
          console.log("✅ Whisper model unloaded successfully");
          process.exit(0);
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/transcription/whispercpp-prompt.ts title="whispercpp-prompt.ts" lineNumbers
      /**
       * Whisper transcription with prompt example.
       *
       * Usage:
       *   bun examples/transcription/whispercpp-prompt.ts
       *
       * This example requires a test audio file (default: examples/audio/sample-16khz.wav).
       * Sample audio files are available in the QVAC source repository, but not included in the published npm package.
       * Set audioChunk to a custom WAV, or download the default audio into examples/audio/:
       *   https://github.com/tetherto/qvac/blob/main/packages/sdk/examples/audio/sample-16khz.wav
       */
      import { loadModel, unloadModel, transcribe, WHISPER_TINY } from "@qvac/sdk";

      try {
        console.log("🎤 Starting Whisper transcription with prompt example...");

        // Load the Whisper model
        console.log("📥 Loading Whisper model...");
        const modelId = await loadModel({
          modelSrc: WHISPER_TINY,
          modelConfig: {
            audio_format: "f32le",
            // Sampling strategy
            strategy: "greedy",
            n_threads: 4,
            // Transcription options
            language: "en",
            translate: false,
            no_timestamps: false,
            single_segment: false,
            print_timestamps: true,
            token_timestamps: true,
            // Quality settings
            temperature: 0.0,
            suppress_blank: true,
            suppress_nst: true,
            // Advanced tuning
            entropy_thold: 2.4,
            logprob_thold: -1.0,
            // VAD configuration
            vad_params: {
              threshold: 0.35,
              min_speech_duration_ms: 200,
              min_silence_duration_ms: 150,
              max_speech_duration_s: 30.0,
              speech_pad_ms: 600,
              samples_overlap: 0.3,
            },
            // Context parameters for GPU
            contextParams: {
              use_gpu: true,
              flash_attn: true,
              gpu_device: 0,
            },
          },
          onProgress: (progress) => {
            console.log(progress);
          },
        });

        console.log(`✅ Whisper model loaded with ID: ${modelId}`);

        // Perform transcription
        console.log("🎧 Transcribing audio...");
        const text = await transcribe({
          modelId,
          audioChunk: "examples/audio/sample-16khz.wav",
          prompt:
            "This is a test recording with clear speech and proper punctuation.",
        });

        console.log("📝 Transcription result:");
        console.log(text);

        // Unload the model when done
        console.log("🧹 Unloading Whisper model...");
        await unloadModel({ modelId });
        console.log("✅ Whisper model unloaded successfully");
        process.exit(0);
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

### Parakeet TDT

The following script shows an example of multilingual transcription using the Parakeet TDT model from a WAV file:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/transcription/parakeet-tdt-filesystem.js title="parakeet-tdt-filesystem.js" lineNumbers
      /**
       * Parakeet TDT transcription from a WAV file.
       *
       * Usage:
       *   bun run examples/transcription/parakeet-tdt-filesystem.ts <wav-file> [parakeet-tdt-gguf]
       *
       * Loads a single GGUF checkpoint (`PARAKEET_TDT_0_6B_V3_Q8_0` by default) and
       * transcribes the file with the batch `transcribe` API. Omit the model
       * argument to use the registry constant.
       *
       * Audio should be 16 kHz mono PCM in a WAV container.
       */
      import { loadModel, unloadModel, transcribe, PARAKEET_TDT_0_6B_V3_Q8_0, } from "@qvac/sdk";
      const args = process.argv.slice(2);
      if (!args[0]) {
          console.error("Usage: bun run examples/transcription/parakeet-tdt-filesystem.ts <wav-file-path> " +
              "[parakeet-tdt-gguf]");
          console.error("\nIf the model path is omitted, defaults to the registry model.");
          process.exit(1);
      }
      const audioFilePath = args[0];
      const parakeetModelSrc = args[1] ?? PARAKEET_TDT_0_6B_V3_Q8_0;
      try {
          console.log("Starting Parakeet transcription example...");
          console.log("Loading Parakeet model...");
          const modelId = await loadModel({
              modelSrc: parakeetModelSrc,
              modelType: "parakeet-transcription",
              onProgress: (progress) => {
                  console.log(`Download progress: ${progress.percentage.toFixed(1)}%`);
              },
          });
          console.log(`Parakeet model loaded with ID: ${modelId}`);
          console.log("Transcribing audio...");
          const text = await transcribe({ modelId, audioChunk: audioFilePath });
          console.log("Transcription result:");
          console.log(text);
          console.log("Unloading Parakeet model...");
          await unloadModel({ modelId });
          console.log("Parakeet model unloaded successfully");
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/transcription/parakeet-tdt-filesystem.ts title="parakeet-tdt-filesystem.ts" lineNumbers
      /**
       * Parakeet TDT transcription from a WAV file.
       *
       * Usage:
       *   bun run examples/transcription/parakeet-tdt-filesystem.ts <wav-file> [parakeet-tdt-gguf]
       *
       * Loads a single GGUF checkpoint (`PARAKEET_TDT_0_6B_V3_Q8_0` by default) and
       * transcribes the file with the batch `transcribe` API. Omit the model
       * argument to use the registry constant.
       *
       * Audio should be 16 kHz mono PCM in a WAV container.
       */
      import {
        loadModel,
        unloadModel,
        transcribe,
        PARAKEET_TDT_0_6B_V3_Q8_0,
      } from "@qvac/sdk";

      const args = process.argv.slice(2);

      if (!args[0]) {
        console.error(
          "Usage: bun run examples/transcription/parakeet-tdt-filesystem.ts <wav-file-path> " +
            "[parakeet-tdt-gguf]",
        );
        console.error(
          "\nIf the model path is omitted, defaults to the registry model.",
        );
        process.exit(1);
      }

      const audioFilePath = args[0];
      const parakeetModelSrc = args[1] ?? PARAKEET_TDT_0_6B_V3_Q8_0;

      try {
        console.log("Starting Parakeet transcription example...");

        console.log("Loading Parakeet model...");
        const modelId = await loadModel({
          modelSrc: parakeetModelSrc,
          modelType: "parakeet-transcription",
          onProgress: (progress) => {
            console.log(`Download progress: ${progress.percentage.toFixed(1)}%`);
          },
        });

        console.log(`Parakeet model loaded with ID: ${modelId}`);

        console.log("Transcribing audio...");
        const text = await transcribe({ modelId, audioChunk: audioFilePath });

        console.log("Transcription result:");
        console.log(text);

        console.log("Unloading Parakeet model...");
        await unloadModel({ modelId });
        console.log("Parakeet model unloaded successfully");
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

### Parakeet CTC

The following script shows an example of English-only transcription using the Parakeet CTC model from a WAV file:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/transcription/parakeet-ctc-filesystem.js title="parakeet-ctc-filesystem.js" lineNumbers
      /**
       * Parakeet CTC transcription from a WAV file.
       *
       * Usage:
       *   bun run examples/transcription/parakeet-ctc-filesystem.ts <wav-file> [parakeet-ctc-gguf]
       *
       * Loads a single GGUF checkpoint (`PARAKEET_CTC_0_6B_Q8_0` by default) and
       * transcribes the file with the batch `transcribe` API. Omit the model
       * argument to use the registry constant.
       *
       * Audio should be 16 kHz mono PCM in a WAV container.
       */
      import { loadModel, unloadModel, transcribe, PARAKEET_CTC_0_6B_Q8_0, } from "@qvac/sdk";
      const args = process.argv.slice(2);
      if (!args[0]) {
          console.error("Usage: bun run examples/transcription/parakeet-ctc-filesystem.ts <wav-file> " +
              "[parakeet-ctc-gguf]");
          console.error("\nIf the model path is omitted, defaults to the registry model.");
          process.exit(1);
      }
      const audioFilePath = args[0];
      const parakeetModelSrc = args[1] ?? PARAKEET_CTC_0_6B_Q8_0;
      try {
          console.log("Loading Parakeet CTC model...");
          const modelId = await loadModel({
              modelSrc: parakeetModelSrc,
              modelType: "parakeet-transcription",
              onProgress: (progress) => {
                  console.log(`Download progress: ${progress.percentage.toFixed(1)}%`);
              },
          });
          console.log(`Parakeet CTC model loaded with ID: ${modelId}`);
          console.log("Transcribing audio...");
          const text = await transcribe({ modelId, audioChunk: audioFilePath });
          console.log("Transcription result:");
          console.log(text);
          console.log("Unloading model...");
          await unloadModel({ modelId });
          console.log("Done");
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/transcription/parakeet-ctc-filesystem.ts title="parakeet-ctc-filesystem.ts" lineNumbers
      /**
       * Parakeet CTC transcription from a WAV file.
       *
       * Usage:
       *   bun run examples/transcription/parakeet-ctc-filesystem.ts <wav-file> [parakeet-ctc-gguf]
       *
       * Loads a single GGUF checkpoint (`PARAKEET_CTC_0_6B_Q8_0` by default) and
       * transcribes the file with the batch `transcribe` API. Omit the model
       * argument to use the registry constant.
       *
       * Audio should be 16 kHz mono PCM in a WAV container.
       */
      import {
        loadModel,
        unloadModel,
        transcribe,
        PARAKEET_CTC_0_6B_Q8_0,
      } from "@qvac/sdk";

      const args = process.argv.slice(2);

      if (!args[0]) {
        console.error(
          "Usage: bun run examples/transcription/parakeet-ctc-filesystem.ts <wav-file> " +
            "[parakeet-ctc-gguf]",
        );
        console.error(
          "\nIf the model path is omitted, defaults to the registry model.",
        );
        process.exit(1);
      }

      const audioFilePath = args[0];
      const parakeetModelSrc = args[1] ?? PARAKEET_CTC_0_6B_Q8_0;

      try {
        console.log("Loading Parakeet CTC model...");
        const modelId = await loadModel({
          modelSrc: parakeetModelSrc,
          modelType: "parakeet-transcription",
          onProgress: (progress) => {
            console.log(`Download progress: ${progress.percentage.toFixed(1)}%`);
          },
        });

        console.log(`Parakeet CTC model loaded with ID: ${modelId}`);

        console.log("Transcribing audio...");
        const text = await transcribe({ modelId, audioChunk: audioFilePath });

        console.log("Transcription result:");
        console.log(text);

        console.log("Unloading model...");
        await unloadModel({ modelId });
        console.log("Done");
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

### Parakeet Sortformer

The following script shows an example of speaker diarization using the Parakeet Sortformer model, followed by per-segment transcription with the TDT model:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/transcription/parakeet-sortformer.js title="parakeet-sortformer.js" lineNumbers
      /**
       * Parakeet Sortformer diarization + TDT transcription pipeline.
       *
       * Usage:
       *   bun run examples/transcription/parakeet-sortformer.ts [sortformer-gguf] [wav-file]
       *
       * Two-step flow: Sortformer v2.1 diarizes the audio, then TDT transcribes each
       * speaker segment. Defaults to registry GGUFs and
       * `examples/audio/diarization-sample-16k.wav`. For live streaming + AOSC, see
       * `parakeet-sortformer-streaming.ts`.
       *
       * Sample audio is in the QVAC source repo but not the published npm package.
       * Download the default file into `examples/audio/`:
       *   https://github.com/tetherto/qvac/blob/main/packages/sdk/examples/audio/diarization-sample-16k.wav
       */
      import { loadModel, unloadModel, transcribe, PARAKEET_TDT_0_6B_V3_Q8_0, PARAKEET_SORTFORMER_4SPK_V2_1_Q8_0, } from "@qvac/sdk";
      import { dirname, join } from "path";
      import { fileURLToPath } from "url";
      import { readFileSync, writeFileSync, mkdirSync } from "fs";
      import { tmpdir } from "os";
      const __dirname = dirname(fileURLToPath(import.meta.url));
      const args = process.argv.slice(2);
      const sortformerSrc = args[0] ?? PARAKEET_SORTFORMER_4SPK_V2_1_Q8_0;
      const defaultAudioPath = join(__dirname, "..", "audio", "diarization-sample-16k.wav");
      const audioFilePath = args[1] ?? defaultAudioPath;
      try {
          // ── Step 1: Diarize with Sortformer ──
          const sfModelId = await loadModel({
              modelSrc: sortformerSrc,
              modelType: "parakeet-transcription",
          });
          const diarization = await transcribe({
              modelId: sfModelId,
              audioChunk: audioFilePath,
          });
          await unloadModel({ modelId: sfModelId });
          const segments = parseDiarization(diarization);
          // ── Step 2: Transcribe each segment with TDT ──
          const tdtModelId = await loadModel({
              modelSrc: PARAKEET_TDT_0_6B_V3_Q8_0,
          });
          const pcm = readPcm(audioFilePath);
          const sliceDir = join(tmpdir(), `qvac-diarize-${Date.now()}`);
          mkdirSync(sliceDir, { recursive: true });
          const results = [];
          for (let i = 0; i < segments.length; i++) {
              const seg = segments[i];
              const slicePath = join(sliceDir, `seg-${i}.wav`);
              if (!writeWavSlice(pcm, seg.start, seg.end, slicePath)) {
                  results.push({ ...seg, text: "[No speech detected]" });
                  continue;
              }
              const text = await transcribe({
                  modelId: tdtModelId,
                  audioChunk: slicePath,
              });
              results.push({ ...seg, text: text.trim() || "[No speech detected]" });
          }
          await unloadModel({ modelId: tdtModelId });
          // ── Step 3: Merge consecutive same-speaker segments and print ──
          const merged = mergeSpeakers(results);
          console.log("\n=== DIARIZED TRANSCRIPTION ===");
          console.log("=".repeat(60));
          for (const entry of merged) {
              console.log(`Speaker ${entry.speaker} (${entry.start.toFixed(2)}s - ${entry.end.toFixed(2)}s):`);
              console.log(`  ${entry.text}\n`);
          }
          console.log("=".repeat(60));
          console.log("\nDone!");
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      // ── Helpers ──
      function parseDiarization(text) {
          const segs = [];
          for (const line of text.split("\n")) {
              const m = line.match(/Speaker (\d+): ([\d.]+)s - ([\d.]+)s/);
              if (m)
                  segs.push({ speaker: +m[1], start: +m[2], end: +m[3] });
          }
          return segs.sort((a, b) => a.start - b.start);
      }
      function readPcm(wavPath) {
          const buf = readFileSync(wavPath);
          const dataOffset = buf.indexOf("data") + 4;
          return buf.subarray(dataOffset + 4, dataOffset + 4 + buf.readUInt32LE(dataOffset));
      }
      function writeWavSlice(pcm, startSec, endSec, outPath) {
          const SR = 16000;
          const BPS = 2;
          const startByte = Math.floor(startSec * SR) * BPS;
          const endByte = Math.min(Math.ceil(endSec * SR) * BPS, pcm.length);
          if (startByte >= endByte)
              return false;
          const slice = pcm.subarray(startByte, endByte);
          const hdr = Buffer.alloc(44);
          hdr.write("RIFF", 0);
          hdr.writeUInt32LE(36 + slice.length, 4);
          hdr.write("WAVEfmt ", 8);
          hdr.writeUInt32LE(16, 16);
          hdr.writeUInt16LE(1, 20);
          hdr.writeUInt16LE(1, 22);
          hdr.writeUInt32LE(SR, 24);
          hdr.writeUInt32LE(SR * BPS, 28);
          hdr.writeUInt16LE(BPS, 32);
          hdr.writeUInt16LE(16, 34);
          hdr.write("data", 36);
          hdr.writeUInt32LE(slice.length, 40);
          writeFileSync(outPath, Buffer.concat([hdr, slice]));
          return true;
      }
      function mergeSpeakers(entries) {
          const out = [];
          for (const e of entries) {
              const last = out[out.length - 1];
              if (last && last.speaker === e.speaker) {
                  last.text += " " + e.text;
                  last.end = e.end;
              }
              else {
                  out.push({ ...e });
              }
          }
          return out;
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/transcription/parakeet-sortformer.ts title="parakeet-sortformer.ts" lineNumbers
      /**
       * Parakeet Sortformer diarization + TDT transcription pipeline.
       *
       * Usage:
       *   bun run examples/transcription/parakeet-sortformer.ts [sortformer-gguf] [wav-file]
       *
       * Two-step flow: Sortformer v2.1 diarizes the audio, then TDT transcribes each
       * speaker segment. Defaults to registry GGUFs and
       * `examples/audio/diarization-sample-16k.wav`. For live streaming + AOSC, see
       * `parakeet-sortformer-streaming.ts`.
       *
       * Sample audio is in the QVAC source repo but not the published npm package.
       * Download the default file into `examples/audio/`:
       *   https://github.com/tetherto/qvac/blob/main/packages/sdk/examples/audio/diarization-sample-16k.wav
       */
      import {
        loadModel,
        unloadModel,
        transcribe,
        PARAKEET_TDT_0_6B_V3_Q8_0,
        PARAKEET_SORTFORMER_4SPK_V2_1_Q8_0,
      } from "@qvac/sdk";
      import { dirname, join } from "path";
      import { fileURLToPath } from "url";
      import { readFileSync, writeFileSync, mkdirSync } from "fs";
      import { tmpdir } from "os";

      const __dirname = dirname(fileURLToPath(import.meta.url));

      const args = process.argv.slice(2);
      const sortformerSrc = args[0] ?? PARAKEET_SORTFORMER_4SPK_V2_1_Q8_0;

      const defaultAudioPath = join(
        __dirname,
        "..",
        "audio",
        "diarization-sample-16k.wav",
      );
      const audioFilePath = args[1] ?? defaultAudioPath;

      try {
        // ── Step 1: Diarize with Sortformer ──

        const sfModelId = await loadModel({
          modelSrc: sortformerSrc,
          modelType: "parakeet-transcription",
        });

        const diarization = await transcribe({
          modelId: sfModelId,
          audioChunk: audioFilePath,
        });
        await unloadModel({ modelId: sfModelId });

        const segments = parseDiarization(diarization);

        // ── Step 2: Transcribe each segment with TDT ──

        const tdtModelId = await loadModel({
          modelSrc: PARAKEET_TDT_0_6B_V3_Q8_0,
        });

        const pcm = readPcm(audioFilePath);
        const sliceDir = join(tmpdir(), `qvac-diarize-${Date.now()}`);
        mkdirSync(sliceDir, { recursive: true });

        const results: {
          speaker: number;
          start: number;
          end: number;
          text: string;
        }[] = [];

        for (let i = 0; i < segments.length; i++) {
          const seg = segments[i]!;
          const slicePath = join(sliceDir, `seg-${i}.wav`);

          if (!writeWavSlice(pcm, seg.start, seg.end, slicePath)) {
            results.push({ ...seg, text: "[No speech detected]" });
            continue;
          }

          const text = await transcribe({
            modelId: tdtModelId,
            audioChunk: slicePath,
          });
          results.push({ ...seg, text: text.trim() || "[No speech detected]" });
        }

        await unloadModel({ modelId: tdtModelId });

        // ── Step 3: Merge consecutive same-speaker segments and print ──

        const merged = mergeSpeakers(results);

        console.log("\n=== DIARIZED TRANSCRIPTION ===");
        console.log("=".repeat(60));
        for (const entry of merged) {
          console.log(
            `Speaker ${entry.speaker} (${entry.start.toFixed(2)}s - ${entry.end.toFixed(2)}s):`,
          );
          console.log(`  ${entry.text}\n`);
        }
        console.log("=".repeat(60));
        console.log("\nDone!");
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }

      // ── Helpers ──

      function parseDiarization(text: string) {
        const segs: { speaker: number; start: number; end: number }[] = [];
        for (const line of text.split("\n")) {
          const m = line.match(/Speaker (\d+): ([\d.]+)s - ([\d.]+)s/);
          if (m) segs.push({ speaker: +m[1]!, start: +m[2]!, end: +m[3]! });
        }
        return segs.sort((a, b) => a.start - b.start);
      }

      function readPcm(wavPath: string): Buffer {
        const buf = readFileSync(wavPath);
        const dataOffset = buf.indexOf("data") + 4;
        return buf.subarray(
          dataOffset + 4,
          dataOffset + 4 + buf.readUInt32LE(dataOffset),
        );
      }

      function writeWavSlice(
        pcm: Buffer,
        startSec: number,
        endSec: number,
        outPath: string,
      ): boolean {
        const SR = 16000;
        const BPS = 2;
        const startByte = Math.floor(startSec * SR) * BPS;
        const endByte = Math.min(Math.ceil(endSec * SR) * BPS, pcm.length);
        if (startByte >= endByte) return false;

        const slice = pcm.subarray(startByte, endByte);
        const hdr = Buffer.alloc(44);
        hdr.write("RIFF", 0);
        hdr.writeUInt32LE(36 + slice.length, 4);
        hdr.write("WAVEfmt ", 8);
        hdr.writeUInt32LE(16, 16);
        hdr.writeUInt16LE(1, 20);
        hdr.writeUInt16LE(1, 22);
        hdr.writeUInt32LE(SR, 24);
        hdr.writeUInt32LE(SR * BPS, 28);
        hdr.writeUInt16LE(BPS, 32);
        hdr.writeUInt16LE(16, 34);
        hdr.write("data", 36);
        hdr.writeUInt32LE(slice.length, 40);

        writeFileSync(outPath, Buffer.concat([hdr, slice]));
        return true;
      }

      function mergeSpeakers<
        T extends { speaker: number; start: number; end: number; text: string },
      >(entries: T[]): T[] {
        const out: T[] = [];
        for (const e of entries) {
          const last = out[out.length - 1];
          if (last && last.speaker === e.speaker) {
            last.text += " " + e.text;
            last.end = e.end;
          } else {
            out.push({ ...e });
          }
        }
        return out;
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>

Text to speech

# Text-to-Speech (/ai-capabilities/text-to-speech)



## Overview

Text-to-Speech uses [`@qvac/tts-ggml`](https://github.com/tetherto/qvac/tree/main/packages/tts-ggml) (GGML) as the inference engine. Load any supported model using `modelType: "tts"`. Then, provide `text` as input (with `inputType: "text"`) to generate speech audio.

`textToSpeech()` returns an object containing `buffer` and, when streaming is enabled, a `bufferStream` for incremental audio output.

## Functions

Use the following sequence of function calls:

1. [`loadModel()`](/reference/api#loadmodel)
2. [`textToSpeech()`](/reference/api#texttospeech)
3. [`unloadModel()`](/reference/api#unloadmodel)

For how to use each function, see [SDK — API reference](/reference/api/).

## Models

### Chatterbox

Chatterbox uses a **T3 GGUF** as the top-level `modelSrc` and an **S3Gen companion GGUF** via `modelConfig.s3genModelSrc`. Optional `referenceAudioSrc` supplies a WAV for voice cloning.

```ts
await loadModel({
  modelSrc: TTS_T3_TURBO_EN_CHATTERBOX_Q8_0,
  modelType: "tts",
  modelConfig: {
    ttsEngine: "chatterbox",
    language: "en",
    s3genModelSrc: TTS_S3GEN_EN_CHATTERBOX,
  },
});
```

Omitting `ttsEngine` defaults to Chatterbox (same as the former ONNX plugin).

### Supertonic

Supertonic uses a **single GGUF** via top-level `modelSrc`. Set `voice`, `ttsSpeed`, and `ttsNumInferenceSteps` in `modelConfig` as needed. Multilingual output is selected by the GGUF (e.g. `TTS_MULTILINGUAL_SUPERTONIC2_Q8_0`) plus `language` — not a separate runtime flag.

```ts
await loadModel({
  modelSrc: TTS_EN_SUPERTONIC_Q8_0,
  modelType: "tts",
  modelConfig: {
    ttsEngine: "supertonic",
    language: "en",
    voice: "F1",
  },
});
```

For model constants, see [SDK — Models](/introduction#models).

<Callout type="info">
  **Migrating from `@qvac/tts-onnx` (multi-file ONNX):** the legacy `modelConfig` shape (`ttsSpeechEncoderSrc`, `ttsEmbedTokensSrc`, `ttsConditionalDecoderSrc`, `ttsLanguageModelSrc`, `ttsTokenizerSrc`, Supertonic `ttsTextEncoderSrc` / `ttsDurationPredictorSrc` / …, and `ttsSupertonicMultilingual`) is no longer supported. Passing any of those fields raises a structured `LegacyTtsModelDeprecatedError` with a migration message. Plugin import path: `@qvac/sdk/tts-ggml/plugin` (a temporary `@qvac/sdk/onnx-tts/plugin` alias exists for older CLI bundles). Legacy ONNX model constants remain exported for one minor cycle for codemod migrations only.
</Callout>

## Example

### Chatterbox

The following script shows an example of Chatterbox TTS with voice cloning from a reference audio file. Use it with [`utils.js` / `utils.ts`](#utils):

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/tts/chatterbox.js title="tts-chatterbox.js" lineNumbers
      import { loadModel, textToSpeech, unloadModel, TTS_T3_TURBO_EN_CHATTERBOX_Q8_0, TTS_S3GEN_EN_CHATTERBOX, } from "@qvac/sdk";
      import { createWav, playAudio, int16ArrayToBuffer, createWavHeader, } from "./utils";
      // Chatterbox TTS (GGML): voice cloning with optional reference audio.
      // Uses registry model constants — downloads automatically from QVAC Registry.
      // Usage: node chatterbox.ts [referenceAudioSrc]
      const [referenceAudioSrc] = process.argv.slice(2);
      const CHATTERBOX_SAMPLE_RATE = 24000;
      try {
          const modelId = await loadModel({
              modelSrc: TTS_T3_TURBO_EN_CHATTERBOX_Q8_0,
              modelConfig: {
                  ttsEngine: "chatterbox",
                  language: "en",
                  s3genModelSrc: TTS_S3GEN_EN_CHATTERBOX.src,
                  ...(referenceAudioSrc ? { referenceAudioSrc } : {}),
              },
              onProgress: (progress) => {
                  console.log(progress);
              },
          });
          console.log(`Model loaded: ${modelId}`);
          console.log("🎵 Testing Text-to-Speech...");
          const result = textToSpeech({
              modelId,
              text: `QVAC SDK is the canonical entry point to QVAC. Written in TypeScript, it provides all QVAC capabilities through a unified interface while also abstracting away the complexity of running your application in a JS environment other than Bare. Supported JS environments include Bare, Node.js, Expo and Bun.`,
              inputType: "text",
              stream: false,
          });
          const audioBuffer = await result.buffer;
          console.log(`TTS complete. Total bytes: ${audioBuffer.length}`);
          console.log("💾 Saving audio to file...");
          createWav(audioBuffer, CHATTERBOX_SAMPLE_RATE, "tts-output.wav");
          console.log("✅ Audio saved to tts-output.wav");
          console.log("🔊 Playing audio...");
          const audioData = int16ArrayToBuffer(audioBuffer);
          const wavBuffer = Buffer.concat([
              createWavHeader(audioData.length, CHATTERBOX_SAMPLE_RATE),
              audioData,
          ]);
          playAudio(wavBuffer);
          console.log("✅ Audio playback complete");
          await unloadModel({ modelId });
          console.log("Model unloaded");
          process.exit(0);
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/tts/chatterbox.ts title="tts-chatterbox.ts" lineNumbers
      import {
        loadModel,
        textToSpeech,
        unloadModel,
        type ModelProgressUpdate,
        TTS_T3_TURBO_EN_CHATTERBOX_Q8_0,
        TTS_S3GEN_EN_CHATTERBOX,
      } from "@qvac/sdk";
      import {
        createWav,
        playAudio,
        int16ArrayToBuffer,
        createWavHeader,
      } from "./utils";

      // Chatterbox TTS (GGML): voice cloning with optional reference audio.
      // Uses registry model constants — downloads automatically from QVAC Registry.
      // Usage: node chatterbox.ts [referenceAudioSrc]
      const [referenceAudioSrc] = process.argv.slice(2);

      const CHATTERBOX_SAMPLE_RATE = 24000;

      try {
        const modelId = await loadModel({
          modelSrc: TTS_T3_TURBO_EN_CHATTERBOX_Q8_0,
          modelConfig: {
            ttsEngine: "chatterbox",
            language: "en",
            s3genModelSrc: TTS_S3GEN_EN_CHATTERBOX.src,
            ...(referenceAudioSrc ? { referenceAudioSrc } : {}),
          },
          onProgress: (progress: ModelProgressUpdate) => {
            console.log(progress);
          },
        });

        console.log(`Model loaded: ${modelId}`);

        console.log("🎵 Testing Text-to-Speech...");
        const result = textToSpeech({
          modelId,
          text: `QVAC SDK is the canonical entry point to QVAC. Written in TypeScript, it provides all QVAC capabilities through a unified interface while also abstracting away the complexity of running your application in a JS environment other than Bare. Supported JS environments include Bare, Node.js, Expo and Bun.`,
          inputType: "text",
          stream: false,
        });

        const audioBuffer = await result.buffer;
        console.log(`TTS complete. Total bytes: ${audioBuffer.length}`);

        console.log("💾 Saving audio to file...");
        createWav(audioBuffer, CHATTERBOX_SAMPLE_RATE, "tts-output.wav");
        console.log("✅ Audio saved to tts-output.wav");

        console.log("🔊 Playing audio...");
        const audioData = int16ArrayToBuffer(audioBuffer);
        const wavBuffer = Buffer.concat([
          createWavHeader(audioData.length, CHATTERBOX_SAMPLE_RATE),
          audioData,
        ]);
        playAudio(wavBuffer);
        console.log("✅ Audio playback complete");

        await unloadModel({ modelId });
        console.log("Model unloaded");
        process.exit(0);
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

### Supertonic

The following script shows an example of Supertonic TTS for general-purpose speech synthesis. Use it with [`utils.js` / `utils.ts`](#utils):

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/tts/supertonic.js title="tts-supertonic.js" lineNumbers
      import { loadModel, textToSpeech, unloadModel, TTS_EN_SUPERTONIC_Q8_0, } from "@qvac/sdk";
      import { createWav, playAudio, int16ArrayToBuffer, createWavHeader, } from "./utils";
      // Supertonic TTS (GGML): fast English synthesis with baked-in voices.
      // Uses registry model constants — downloads automatically from QVAC Registry.
      const SUPERTONIC_SAMPLE_RATE = 44100;
      try {
          const modelId = await loadModel({
              modelSrc: TTS_EN_SUPERTONIC_Q8_0,
              modelConfig: {
                  ttsEngine: "supertonic",
                  language: "en",
                  voice: "F1",
                  ttsSpeed: 1.05,
                  ttsNumInferenceSteps: 5,
              },
              onProgress: (progress) => {
                  console.log(progress);
              },
          });
          console.log(`Model loaded: ${modelId}`);
          console.log("🎵 Testing Text-to-Speech...");
          const result = textToSpeech({
              modelId,
              text: `QVAC SDK is the canonical entry point to QVAC. Written in TypeScript, it provides all QVAC capabilities through a unified interface while also abstracting away the complexity of running your application in a JS environment other than Bare. Supported JS environments include Bare, Node.js, Expo and Bun.`,
              inputType: "text",
              stream: false,
          });
          const audioBuffer = await result.buffer;
          console.log(`TTS complete. Total samples: ${audioBuffer.length}`);
          console.log("💾 Saving audio to file...");
          createWav(audioBuffer, SUPERTONIC_SAMPLE_RATE, "supertonic-output.wav");
          console.log("✅ Audio saved to supertonic-output.wav");
          console.log("🔊 Playing audio...");
          const audioData = int16ArrayToBuffer(audioBuffer);
          const wavBuffer = Buffer.concat([
              createWavHeader(audioData.length, SUPERTONIC_SAMPLE_RATE),
              audioData,
          ]);
          playAudio(wavBuffer);
          console.log("✅ Audio playback complete");
          await unloadModel({ modelId });
          console.log("Model unloaded");
          process.exit(0);
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/tts/supertonic.ts title="tts-supertonic.ts" lineNumbers
      import {
        loadModel,
        textToSpeech,
        unloadModel,
        type ModelProgressUpdate,
        TTS_EN_SUPERTONIC_Q8_0,
      } from "@qvac/sdk";
      import {
        createWav,
        playAudio,
        int16ArrayToBuffer,
        createWavHeader,
      } from "./utils";

      // Supertonic TTS (GGML): fast English synthesis with baked-in voices.
      // Uses registry model constants — downloads automatically from QVAC Registry.
      const SUPERTONIC_SAMPLE_RATE = 44100;

      try {
        const modelId = await loadModel({
          modelSrc: TTS_EN_SUPERTONIC_Q8_0,
          modelConfig: {
            ttsEngine: "supertonic",
            language: "en",
            voice: "F1",
            ttsSpeed: 1.05,
            ttsNumInferenceSteps: 5,
          },
          onProgress: (progress: ModelProgressUpdate) => {
            console.log(progress);
          },
        });

        console.log(`Model loaded: ${modelId}`);

        console.log("🎵 Testing Text-to-Speech...");
        const result = textToSpeech({
          modelId,
          text: `QVAC SDK is the canonical entry point to QVAC. Written in TypeScript, it provides all QVAC capabilities through a unified interface while also abstracting away the complexity of running your application in a JS environment other than Bare. Supported JS environments include Bare, Node.js, Expo and Bun.`,
          inputType: "text",
          stream: false,
        });

        const audioBuffer = await result.buffer;
        console.log(`TTS complete. Total samples: ${audioBuffer.length}`);

        console.log("💾 Saving audio to file...");
        createWav(audioBuffer, SUPERTONIC_SAMPLE_RATE, "supertonic-output.wav");
        console.log("✅ Audio saved to supertonic-output.wav");

        console.log("🔊 Playing audio...");
        const audioData = int16ArrayToBuffer(audioBuffer);
        const wavBuffer = Buffer.concat([
          createWavHeader(audioData.length, SUPERTONIC_SAMPLE_RATE),
          audioData,
        ]);
        playAudio(wavBuffer);
        console.log("✅ Audio playback complete");

        await unloadModel({ modelId });
        console.log("Model unloaded");
        process.exit(0);
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

### Utils

The following helper script is used by both examples above to convert the raw PCM samples returned by `textToSpeech()` into a WAV file and play it back:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/tts/utils.js title="utils.js" lineNumbers
      import { writeFileSync, unlinkSync } from "fs";
      import { spawn, spawnSync } from "child_process";
      import { platform, tmpdir } from "os";
      import { join } from "path";
      /**
       * Create WAV header for 16-bit PCM audio
       */
      export function createWavHeader(dataLength, sampleRate) {
          const header = Buffer.alloc(44);
          // RIFF header
          header.write("RIFF", 0);
          header.writeUInt32LE(36 + dataLength, 4);
          header.write("WAVE", 8);
          // fmt chunk
          header.write("fmt ", 12);
          header.writeUInt32LE(16, 16); // fmt chunk size
          header.writeUInt16LE(1, 20); // PCM format
          header.writeUInt16LE(1, 22); // mono
          header.writeUInt32LE(sampleRate, 24);
          header.writeUInt32LE(sampleRate * 2, 28); // byte rate
          header.writeUInt16LE(2, 32); // block align
          header.writeUInt16LE(16, 34); // bits per sample
          // data chunk
          header.write("data", 36);
          header.writeUInt32LE(dataLength, 40);
          return header;
      }
      /**
       * Convert Int16Array to Buffer
       */
      export function int16ArrayToBuffer(samples) {
          const buffer = Buffer.alloc(samples.length * 2);
          for (let i = 0; i < samples.length; i++) {
              const value = Math.max(-32768, Math.min(32767, Math.round(samples[i] ?? 0)));
              buffer.writeInt16LE(value, i * 2);
          }
          return buffer;
      }
      /**
       * Create and save WAV file
       */
      export function createWav(audioBuffer, sampleRate, filename) {
          const audioData = int16ArrayToBuffer(audioBuffer);
          const wavHeader = createWavHeader(audioData.length, sampleRate);
          const wavFile = Buffer.concat([wavHeader, audioData]);
          writeFileSync(filename, wavFile);
          console.log(`WAV file saved as: ${filename}`);
      }
      /**
       * Play a WAV buffer by streaming it into ffplay over stdin.
       *
       * ffplay ships with ffmpeg and is cross-platform (macOS/Linux/Windows), so
       * we avoid the old "write to /tmp then shell out to afplay/aplay/powershell"
       * dance — no temp files, no platform switch, no hardcoded /tmp path (which
       * doesn't exist on Windows). Requires ffplay on PATH.
       */
      /**
       * Play one mono s16le PCM chunk (as a minimal WAV) and wait for the player to finish.
       * Chunks are played sequentially when awaited in order — suitable for streaming TTS output.
       */
      export function playPcmInt16Chunk(samples, sampleRate) {
          if (samples.length === 0) {
              return Promise.resolve();
          }
          const audioData = int16ArrayToBuffer(samples);
          const wavHeader = createWavHeader(audioData.length, sampleRate);
          const wavFile = Buffer.concat([wavHeader, audioData]);
          // `os.tmpdir()` resolves to the OS-specific temp directory (e.g. `%TEMP%`
          // on Windows), so the Windows branch below no longer tries to read a
          // POSIX-only `/tmp/...` path.
          const tempFile = join(tmpdir(), `qvac-tts-chunk-${Date.now()}-${Math.random().toString(16).slice(2)}.wav`);
          writeFileSync(tempFile, wavFile);
          const currentPlatform = platform();
          let audioPlayer;
          let args;
          switch (currentPlatform) {
              case "darwin":
                  audioPlayer = "afplay";
                  args = [tempFile];
                  break;
              case "linux":
                  audioPlayer = "aplay";
                  args = [tempFile];
                  break;
              case "win32":
                  audioPlayer = "powershell";
                  args = [
                      "-Command",
                      `Add-Type -AssemblyName presentationCore; (New-Object Media.SoundPlayer).LoadStream([System.IO.File]::ReadAllBytes('${tempFile}')).PlaySync()`,
                  ];
                  break;
              default:
                  audioPlayer = "aplay";
                  args = [tempFile];
          }
          return new Promise(function (resolve, reject) {
              const proc = spawn(audioPlayer, args, { stdio: "ignore" });
              proc.on("error", function (err) {
                  try {
                      unlinkSync(tempFile);
                  }
                  catch {
                      // ignore
                  }
                  reject(err);
              });
              proc.on("close", function (code) {
                  try {
                      unlinkSync(tempFile);
                  }
                  catch {
                      // ignore
                  }
                  if (code === 0) {
                      resolve();
                  }
                  else {
                      reject(new Error(`Audio player exited with code ${code}`));
                  }
              });
          });
      }
      export function playAudio(audioBuffer) {
          const result = spawnSync("ffplay", [
              "-hide_banner",
              "-loglevel",
              "error",
              "-autoexit",
              "-nodisp",
              "-i",
              "pipe:0",
          ], {
              input: audioBuffer,
              stdio: ["pipe", "inherit", "inherit"],
          });
          if (result.error) {
              const code = result.error.code;
              if (code === "ENOENT") {
                  throw new Error("ffplay not found on PATH. Install ffmpeg (ffplay ships with it) and retry.");
              }
              throw new Error(`ffplay failed: ${result.error.message}`);
          }
          if (result.status !== 0) {
              throw new Error(`ffplay exited with code ${result.status}`);
          }
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/tts/utils.ts title="utils.ts" lineNumbers
      import { writeFileSync, unlinkSync } from "fs";
      import { spawn, spawnSync } from "child_process";
      import { platform, tmpdir } from "os";
      import { join } from "path";

      /**
       * Create WAV header for 16-bit PCM audio
       */
      export function createWavHeader(
        dataLength: number,
        sampleRate: number,
      ): Buffer {
        const header = Buffer.alloc(44);

        // RIFF header
        header.write("RIFF", 0);
        header.writeUInt32LE(36 + dataLength, 4);
        header.write("WAVE", 8);

        // fmt chunk
        header.write("fmt ", 12);
        header.writeUInt32LE(16, 16); // fmt chunk size
        header.writeUInt16LE(1, 20); // PCM format
        header.writeUInt16LE(1, 22); // mono
        header.writeUInt32LE(sampleRate, 24);
        header.writeUInt32LE(sampleRate * 2, 28); // byte rate
        header.writeUInt16LE(2, 32); // block align
        header.writeUInt16LE(16, 34); // bits per sample

        // data chunk
        header.write("data", 36);
        header.writeUInt32LE(dataLength, 40);

        return header;
      }

      /**
       * Convert Int16Array to Buffer
       */
      export function int16ArrayToBuffer(samples: number[]): Buffer {
        const buffer = Buffer.alloc(samples.length * 2);
        for (let i = 0; i < samples.length; i++) {
          const value = Math.max(
            -32768,
            Math.min(32767, Math.round(samples[i] ?? 0)),
          );
          buffer.writeInt16LE(value, i * 2);
        }
        return buffer;
      }

      /**
       * Create and save WAV file
       */
      export function createWav(
        audioBuffer: number[],
        sampleRate: number,
        filename: string,
      ): void {
        const audioData = int16ArrayToBuffer(audioBuffer);
        const wavHeader = createWavHeader(audioData.length, sampleRate);
        const wavFile = Buffer.concat([wavHeader, audioData]);

        writeFileSync(filename, wavFile);
        console.log(`WAV file saved as: ${filename}`);
      }

      /**
       * Play a WAV buffer by streaming it into ffplay over stdin.
       *
       * ffplay ships with ffmpeg and is cross-platform (macOS/Linux/Windows), so
       * we avoid the old "write to /tmp then shell out to afplay/aplay/powershell"
       * dance — no temp files, no platform switch, no hardcoded /tmp path (which
       * doesn't exist on Windows). Requires ffplay on PATH.
       */
      /**
       * Play one mono s16le PCM chunk (as a minimal WAV) and wait for the player to finish.
       * Chunks are played sequentially when awaited in order — suitable for streaming TTS output.
       */
      export function playPcmInt16Chunk(
        samples: number[],
        sampleRate: number,
      ): Promise<void> {
        if (samples.length === 0) {
          return Promise.resolve();
        }

        const audioData = int16ArrayToBuffer(samples);
        const wavHeader = createWavHeader(audioData.length, sampleRate);
        const wavFile = Buffer.concat([wavHeader, audioData]);
        // `os.tmpdir()` resolves to the OS-specific temp directory (e.g. `%TEMP%`
        // on Windows), so the Windows branch below no longer tries to read a
        // POSIX-only `/tmp/...` path.
        const tempFile = join(
          tmpdir(),
          `qvac-tts-chunk-${Date.now()}-${Math.random().toString(16).slice(2)}.wav`,
        );
        writeFileSync(tempFile, wavFile);

        const currentPlatform = platform();
        let audioPlayer: string;
        let args: string[];

        switch (currentPlatform) {
          case "darwin":
            audioPlayer = "afplay";
            args = [tempFile];
            break;
          case "linux":
            audioPlayer = "aplay";
            args = [tempFile];
            break;
          case "win32":
            audioPlayer = "powershell";
            args = [
              "-Command",
              `Add-Type -AssemblyName presentationCore; (New-Object Media.SoundPlayer).LoadStream([System.IO.File]::ReadAllBytes('${tempFile}')).PlaySync()`,
            ];
            break;
          default:
            audioPlayer = "aplay";
            args = [tempFile];
        }

        return new Promise(function (resolve, reject) {
          const proc = spawn(audioPlayer, args, { stdio: "ignore" });
          proc.on("error", function (err) {
            try {
              unlinkSync(tempFile);
            } catch {
              // ignore
            }
            reject(err);
          });
          proc.on("close", function (code) {
            try {
              unlinkSync(tempFile);
            } catch {
              // ignore
            }
            if (code === 0) {
              resolve();
            } else {
              reject(new Error(`Audio player exited with code ${code}`));
            }
          });
        });
      }

      export function playAudio(audioBuffer: Buffer): void {
        const result = spawnSync(
          "ffplay",
          [
            "-hide_banner",
            "-loglevel",
            "error",
            "-autoexit",
            "-nodisp",
            "-i",
            "pipe:0",
          ],
          {
            input: audioBuffer,
            stdio: ["pipe", "inherit", "inherit"],
          },
        );

        if (result.error) {
          const code = (result.error as NodeJS.ErrnoException).code;
          if (code === "ENOENT") {
            throw new Error(
              "ffplay not found on PATH. Install ffmpeg (ffplay ships with it) and retry.",
            );
          }
          throw new Error(`ffplay failed: ${result.error.message}`);
        }
        if (result.status !== 0) {
          throw new Error(`ffplay exited with code ${result.status}`);
        }
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>

Voice assistant

# Voice assistant (/ai-capabilities/voice-assistant)



## Overview

A voice assistant chains three AI capabilities into a continuous conversation loop:

<Mermaid
  chart="flowchart LR
    Mic([Microphone]) -->|PCM audio| ASR[ASR<br/>Whisper + Silero VAD]
    ASR -->|utterance| LLM[LLM<br/>text generation]
    LLM -->|response text| TTS[TTS<br/>Supertonic]
    TTS -->|audio| Spk([Speakers])
    Spk -.conversation loop.-> Mic

    click ASR &#x22;/ai-capabilities/transcription&#x22; &#x22;Transcription&#x22;
    click LLM &#x22;/ai-capabilities/text-generation&#x22; &#x22;Text generation&#x22;
    click TTS &#x22;/ai-capabilities/text-to-speech&#x22; &#x22;Text-to-speech&#x22;"
/>

Compared to using each capability individually, the key differences are:

* You need to coordinate **three model loads** simultaneously (Whisper + VAD, LLM, and TTS bundle) — they all stay loaded for the duration of the session.
* VAD parameters need **conservative tuning** to avoid the assistant transcribing its own TTS output (self-hearing feedback loop).
* You should **gate the microphone during TTS playback** and apply a short post-playback cooldown so room reverb doesn't bleed into the next utterance.
* You should **filter short or non-linguistic transcripts** (e.g. `"."`, `"[BLANK_AUDIO]"`) since Whisper hallucinates them from near-silent audio.

## Functions

Use the following sequence of function calls:

1. [`loadModel()`](/reference/api#loadmodel) three times — once per `modelType` (`"whisper"`, `"llm"`, `"tts"`).
2. [`transcribeStream()`](/reference/api#transcribestream) — open a streaming session that emits utterances on VAD-detected pauses.
3. [`completion()`](/reference/api#completion) — generate a response from the rolling conversation history (streamed).
4. [`textToSpeech()`](/reference/api#texttospeech) — synthesize the response into a PCM buffer.
5. [`unloadModel()`](/reference/api#unloadmodel) for each loaded model on shutdown.

For how to use each function, see [SDK — API reference](/reference/api/).

## Models

You load four model bundles in total:

* A `qvac-ext-lib-whisper.cpp`-compatible model for transcription, plus a Silero VAD model.
* A `llama.cpp`-compatible LLM for response generation.
* A Supertonic TTS bundle (text encoder, duration predictor, vector estimator, vocoder, unicode indexer, config, and voice style).

Recommended defaults (used in the example below):

| Stage | Model                    |
| ----- | ------------------------ |
| ASR   | `WHISPER_TINY`           |
| VAD   | `VAD_SILERO_5_1_2`       |
| LLM   | `LLAMA_3_2_1B_INST_Q4_0` |
| TTS   | Supertonic2 (English)    |

For models available as constants, see [SDK — Models](/introduction#models).

## Example

This example is **desktop-only**. Mobile (React Native / Expo) needs a different audio path and isn't covered here.

### Requirements

* **FFmpeg** (with `ffplay`) on `PATH` — `ffmpeg` captures mic audio, `ffplay` plays back TTS output.
* **Microphone** access (on macOS, the running shell needs mic permission in *System Settings → Privacy & Security → Microphone*).
* **Speakers** connected and selected as the default output device.

<Accordions type="multiple">
  <Accordion title="Installing FFmpeg">
    | Platform         | Command                                                                                              |
    | ---------------- | ---------------------------------------------------------------------------------------------------- |
    | macOS (Homebrew) | `brew install ffmpeg`                                                                                |
    | Debian / Ubuntu  | `sudo apt update && sudo apt install ffmpeg`                                                         |
    | Fedora / RHEL    | `sudo dnf install ffmpeg` (enable [RPM Fusion](https://rpmfusion.org/Configuration) first if needed) |
    | Arch Linux       | `sudo pacman -S ffmpeg`                                                                              |

    Verify the install with:

    ```bash
    ffmpeg -version
    ```
  </Accordion>

  <Accordion title="Selecting a microphone">
    By default the example uses the system default mic on each OS:

    * **macOS:** AVFoundation audio device `:0`.
    * **Linux:** PulseAudio source `default`.

    To use a different mic, set the `MIC_DEVICE` environment variable:

    ```bash
    # macOS — pick by index (list with `ffmpeg -f avfoundation -list_devices true -i ""`)
    MIC_DEVICE=":1" bun run examples/voice-assistant/voice-assistant.ts

    # Linux — pick a PulseAudio source (list with `pactl list short sources`)
    MIC_DEVICE="alsa_input.usb-Blue_Microphones_Yeti-00" \
      bun run examples/voice-assistant/voice-assistant.ts
    ```
  </Accordion>
</Accordions>

### Running it

The following script implements the full loop with VAD tuning, mic gating during playback, and short-utterance filtering:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/voice-assistant/voice-assistant.js title="voice-assistant.js" lineNumbers
      /**
       * Real-time Voice Assistant: mic → Whisper (with Silero VAD) → Llama → Supertonic TTS.
       *
       * Usage: bun run examples/voice-assistant/voice-assistant.ts
       *
       * Speak a question; the VAD detects when you pause, the utterance is
       * transcribed, sent to the LLM, and the response is spoken back. The loop
       * continues until you press Ctrl+C. While the assistant is speaking, mic
       * audio is dropped so it does not hear itself.
       *
       * Requirements: FFmpeg installed, microphone access, speakers.
       */
      import { loadModel, unloadModel, transcribeStream, completion, textToSpeech, WHISPER_TINY, VAD_SILERO_5_1_2, LLAMA_3_2_1B_INST_Q4_0, TTS_EN_SUPERTONIC_Q8_0, } from "@qvac/sdk";
      import { spawnSync } from "child_process";
      import { startMicrophone } from "../audio/mic-input";
      import { createWavHeader, int16ArrayToBuffer, playAudio } from "../tts/utils";
      const MIC_SAMPLE_RATE = 16000;
      const TTS_SAMPLE_RATE = 44100;
      const SYSTEM_PROMPT = "You are a concise, friendly voice assistant. Keep responses under two sentences. " +
          "Never use markdown, lists, or code blocks — your output will be spoken aloud.";
      // VAD parameters tuned for conversational speech without the assistant looping
      // on its own echo. These defaults are deliberately conservative:
      //   - threshold 0.6: less sensitive than Silero's default; avoids triggering
      //     on TTS reverb bleeding into the mic or low-level background noise.
      //   - min_speech_duration_ms 300: drops short clicks/breaths and stray words.
      //   - min_silence_duration_ms 700: requires a longer quiet tail before
      //     committing a segment. Crucial for preventing self-hearing feedback loops
      //     where Whisper hallucinates content from near-silent audio.
      //   - max_speech_duration_s 15: caps runaway utterances.
      //   - speech_pad_ms 200: padding improves accuracy on utterance edges.
      // If the assistant cuts you off mid-sentence, raise min_silence_duration_ms.
      // If it keeps hallucinating / talking to itself, raise threshold to 0.7 and/or
      // min_silence_duration_ms to 900.
      const VAD_PARAMS = {
          threshold: 0.6,
          min_speech_duration_ms: 300,
          min_silence_duration_ms: 700,
          max_speech_duration_s: 15.0,
          speech_pad_ms: 200,
      };
      // Short grace period after TTS playback before we start listening again.
      // Gives the speaker amp / room reverb a moment to fully settle so the first
      // post-playback mic frames don't get transcribed as the tail of our own voice.
      const POST_PLAYBACK_COOLDOWN_MS = 300;
      // Minimum characters for an utterance to be considered meaningful. Whisper
      // frequently hallucinates single words like "you", ".", or "Thanks." from
      // silence or faint noise; these short phantoms are the main driver of the
      // self-hearing feedback loop, so we drop them.
      const MIN_UTTERANCE_CHARS = 3;
      function isMeaningfulTranscript(text) {
          const trimmed = text.trim();
          if (trimmed.length === 0)
              return false;
          if (trimmed.includes("[No speech detected]"))
              return false;
          // Whisper sometimes emits non-linguistic cues on silence, e.g. "[BLANK_AUDIO]".
          if (/^\[[^\]]+\]$/.test(trimmed))
              return false;
          // Strip punctuation/whitespace for the length check so ". . ." is rejected.
          const letters = trimmed.replace(/[^\p{L}\p{N}]/gu, "");
          if (letters.length < MIN_UTTERANCE_CHARS)
              return false;
          return true;
      }
      function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
      }
      // ── Main ──
      for (const tool of ["ffmpeg", "ffplay"]) {
          const r = spawnSync(tool, ["-version"], { stdio: "ignore" });
          if (r.error || r.status !== 0) {
              console.error(`${tool} not found on PATH. Install ffmpeg (ffplay ships with it) and retry.`);
              process.exit(1);
          }
      }
      console.log("Loading whisper-tiny + Silero VAD...");
      const asrModelId = await loadModel({
          modelSrc: WHISPER_TINY,
          modelConfig: {
              vadModelSrc: VAD_SILERO_5_1_2,
              audio_format: "f32le",
              strategy: "greedy",
              n_threads: 4,
              language: "en",
              no_timestamps: true,
              suppress_blank: true,
              suppress_nst: true,
              temperature: 0.0,
              vad_params: VAD_PARAMS,
          },
      });
      console.log("Loading Llama 3.2 1B...");
      const llmModelId = await loadModel({
          modelSrc: LLAMA_3_2_1B_INST_Q4_0,
          modelConfig: {
              ctx_size: 4096,
          },
      });
      console.log("Loading Supertonic TTS...");
      const ttsModelId = await loadModel({
          modelSrc: TTS_EN_SUPERTONIC_Q8_0,
          modelConfig: {
              ttsEngine: "supertonic",
              language: "en",
              voice: "F1",
              ttsSpeed: 1.05,
              ttsNumInferenceSteps: 5,
          },
      });
      console.log("All models loaded.\n");
      const ffmpeg = startMicrophone({
          sampleRate: MIC_SAMPLE_RATE,
          format: "f32le",
      });
      const session = await transcribeStream({ modelId: asrModelId });
      const history = [{ role: "system", content: SYSTEM_PROMPT }];
      // Dropped-chunk gate: while the assistant is speaking we stop feeding the mic
      // stream into the ASR session. Using a flag (rather than pausing the ffmpeg
      // pipe) keeps the pipe drained so we never accumulate stale audio, and the
      // VAD starts fresh on the next user turn.
      let isSpeaking = false;
      ffmpeg.stdout.on("data", (chunk) => {
          if (isSpeaking)
              return;
          session.write(chunk);
      });
      let shuttingDown = false;
      async function cleanup() {
          if (shuttingDown)
              return;
          shuttingDown = true;
          console.log("\n\nStopping...");
          ffmpeg.kill();
          try {
              session.end();
          }
          catch {
              // session may already be closed
          }
          await unloadModel({ modelId: ttsModelId }).catch(() => { });
          await unloadModel({ modelId: llmModelId }).catch(() => { });
          await unloadModel({ modelId: asrModelId }).catch(() => { });
          console.log("Done.");
          process.exit(0);
      }
      process.on("SIGINT", () => void cleanup());
      process.on("SIGTERM", () => void cleanup());
      console.log("🎙️  Listening. Speak a question and pause. Ctrl+C to quit.\n");
      for await (const rawText of session) {
          if (!isMeaningfulTranscript(rawText))
              continue;
          const userText = rawText.trim();
          console.log(`🗣️  You: ${userText}`);
          history.push({ role: "user", content: userText });
          isSpeaking = true;
          try {
              process.stdout.write("🤖 Assistant: ");
              const llmResult = completion({
                  modelId: llmModelId,
                  history,
                  stream: true,
              });
              let assistantText = "";
              for await (const token of llmResult.tokenStream) {
                  process.stdout.write(token);
                  assistantText += token;
              }
              process.stdout.write("\n");
              history.push({ role: "assistant", content: assistantText });
              const spoken = assistantText.trim();
              if (spoken.length > 0) {
                  const ttsResult = textToSpeech({
                      modelId: ttsModelId,
                      text: spoken,
                      inputType: "text",
                      stream: false,
                  });
                  const samples = await ttsResult.buffer;
                  const audioData = int16ArrayToBuffer(samples);
                  const wavBuffer = Buffer.concat([
                      createWavHeader(audioData.length, TTS_SAMPLE_RATE),
                      audioData,
                  ]);
                  playAudio(wavBuffer);
                  // Cooldown keeps the mic gated briefly so speaker tail / room reverb
                  // doesn't feed into the next VAD segment.
                  await sleep(POST_PLAYBACK_COOLDOWN_MS);
              }
          }
          catch (turnError) {
              console.error("\n⚠️  Turn failed:", turnError instanceof Error ? turnError.message : turnError);
          }
          finally {
              isSpeaking = false;
              console.log("\n🎙️  Listening...\n");
          }
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/voice-assistant/voice-assistant.ts title="voice-assistant.ts" lineNumbers
      /**
       * Real-time Voice Assistant: mic → Whisper (with Silero VAD) → Llama → Supertonic TTS.
       *
       * Usage: bun run examples/voice-assistant/voice-assistant.ts
       *
       * Speak a question; the VAD detects when you pause, the utterance is
       * transcribed, sent to the LLM, and the response is spoken back. The loop
       * continues until you press Ctrl+C. While the assistant is speaking, mic
       * audio is dropped so it does not hear itself.
       *
       * Requirements: FFmpeg installed, microphone access, speakers.
       */
      import {
        loadModel,
        unloadModel,
        transcribeStream,
        completion,
        textToSpeech,
        WHISPER_TINY,
        VAD_SILERO_5_1_2,
        LLAMA_3_2_1B_INST_Q4_0,
        TTS_EN_SUPERTONIC_Q8_0,
      } from "@qvac/sdk";
      import { spawnSync } from "child_process";
      import { startMicrophone } from "../audio/mic-input";
      import { createWavHeader, int16ArrayToBuffer, playAudio } from "../tts/utils";

      const MIC_SAMPLE_RATE = 16000;
      const TTS_SAMPLE_RATE = 44100;

      const SYSTEM_PROMPT =
        "You are a concise, friendly voice assistant. Keep responses under two sentences. " +
        "Never use markdown, lists, or code blocks — your output will be spoken aloud.";

      // VAD parameters tuned for conversational speech without the assistant looping
      // on its own echo. These defaults are deliberately conservative:
      //   - threshold 0.6: less sensitive than Silero's default; avoids triggering
      //     on TTS reverb bleeding into the mic or low-level background noise.
      //   - min_speech_duration_ms 300: drops short clicks/breaths and stray words.
      //   - min_silence_duration_ms 700: requires a longer quiet tail before
      //     committing a segment. Crucial for preventing self-hearing feedback loops
      //     where Whisper hallucinates content from near-silent audio.
      //   - max_speech_duration_s 15: caps runaway utterances.
      //   - speech_pad_ms 200: padding improves accuracy on utterance edges.
      // If the assistant cuts you off mid-sentence, raise min_silence_duration_ms.
      // If it keeps hallucinating / talking to itself, raise threshold to 0.7 and/or
      // min_silence_duration_ms to 900.
      const VAD_PARAMS = {
        threshold: 0.6,
        min_speech_duration_ms: 300,
        min_silence_duration_ms: 700,
        max_speech_duration_s: 15.0,
        speech_pad_ms: 200,
      };

      // Short grace period after TTS playback before we start listening again.
      // Gives the speaker amp / room reverb a moment to fully settle so the first
      // post-playback mic frames don't get transcribed as the tail of our own voice.
      const POST_PLAYBACK_COOLDOWN_MS = 300;

      // Minimum characters for an utterance to be considered meaningful. Whisper
      // frequently hallucinates single words like "you", ".", or "Thanks." from
      // silence or faint noise; these short phantoms are the main driver of the
      // self-hearing feedback loop, so we drop them.
      const MIN_UTTERANCE_CHARS = 3;

      function isMeaningfulTranscript(text: string): boolean {
        const trimmed = text.trim();
        if (trimmed.length === 0) return false;
        if (trimmed.includes("[No speech detected]")) return false;
        // Whisper sometimes emits non-linguistic cues on silence, e.g. "[BLANK_AUDIO]".
        if (/^\[[^\]]+\]$/.test(trimmed)) return false;
        // Strip punctuation/whitespace for the length check so ". . ." is rejected.
        const letters = trimmed.replace(/[^\p{L}\p{N}]/gu, "");
        if (letters.length < MIN_UTTERANCE_CHARS) return false;
        return true;
      }

      function sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      // ── Main ──

      for (const tool of ["ffmpeg", "ffplay"]) {
        const r = spawnSync(tool, ["-version"], { stdio: "ignore" });
        if (r.error || r.status !== 0) {
          console.error(
            `${tool} not found on PATH. Install ffmpeg (ffplay ships with it) and retry.`,
          );
          process.exit(1);
        }
      }

      console.log("Loading whisper-tiny + Silero VAD...");
      const asrModelId = await loadModel({
        modelSrc: WHISPER_TINY,
        modelConfig: {
          vadModelSrc: VAD_SILERO_5_1_2,
          audio_format: "f32le",
          strategy: "greedy",
          n_threads: 4,
          language: "en",
          no_timestamps: true,
          suppress_blank: true,
          suppress_nst: true,
          temperature: 0.0,
          vad_params: VAD_PARAMS,
        },
      });

      console.log("Loading Llama 3.2 1B...");
      const llmModelId = await loadModel({
        modelSrc: LLAMA_3_2_1B_INST_Q4_0,
        modelConfig: {
          ctx_size: 4096,
        },
      });

      console.log("Loading Supertonic TTS...");
      const ttsModelId = await loadModel({
        modelSrc: TTS_EN_SUPERTONIC_Q8_0,
        modelConfig: {
          ttsEngine: "supertonic",
          language: "en",
          voice: "F1",
          ttsSpeed: 1.05,
          ttsNumInferenceSteps: 5,
        },
      });

      console.log("All models loaded.\n");

      const ffmpeg = startMicrophone({
        sampleRate: MIC_SAMPLE_RATE,
        format: "f32le",
      });
      const session = await transcribeStream({ modelId: asrModelId });

      const history: Array<{
        role: "system" | "user" | "assistant";
        content: string;
      }> = [{ role: "system", content: SYSTEM_PROMPT }];

      // Dropped-chunk gate: while the assistant is speaking we stop feeding the mic
      // stream into the ASR session. Using a flag (rather than pausing the ffmpeg
      // pipe) keeps the pipe drained so we never accumulate stale audio, and the
      // VAD starts fresh on the next user turn.
      let isSpeaking = false;

      ffmpeg.stdout.on("data", (chunk: Buffer) => {
        if (isSpeaking) return;
        session.write(chunk);
      });

      let shuttingDown = false;
      async function cleanup() {
        if (shuttingDown) return;
        shuttingDown = true;
        console.log("\n\nStopping...");
        ffmpeg.kill();
        try {
          session.end();
        } catch {
          // session may already be closed
        }
        await unloadModel({ modelId: ttsModelId }).catch(() => {});
        await unloadModel({ modelId: llmModelId }).catch(() => {});
        await unloadModel({ modelId: asrModelId }).catch(() => {});
        console.log("Done.");
        process.exit(0);
      }

      process.on("SIGINT", () => void cleanup());
      process.on("SIGTERM", () => void cleanup());

      console.log("🎙️  Listening. Speak a question and pause. Ctrl+C to quit.\n");

      for await (const rawText of session) {
        if (!isMeaningfulTranscript(rawText)) continue;
        const userText = rawText.trim();

        console.log(`🗣️  You: ${userText}`);
        history.push({ role: "user", content: userText });

        isSpeaking = true;
        try {
          process.stdout.write("🤖 Assistant: ");
          const llmResult = completion({
            modelId: llmModelId,
            history,
            stream: true,
          });
          let assistantText = "";
          for await (const token of llmResult.tokenStream) {
            process.stdout.write(token);
            assistantText += token;
          }
          process.stdout.write("\n");
          history.push({ role: "assistant", content: assistantText });

          const spoken = assistantText.trim();
          if (spoken.length > 0) {
            const ttsResult = textToSpeech({
              modelId: ttsModelId,
              text: spoken,
              inputType: "text",
              stream: false,
            });
            const samples = await ttsResult.buffer;
            const audioData = int16ArrayToBuffer(samples);
            const wavBuffer = Buffer.concat([
              createWavHeader(audioData.length, TTS_SAMPLE_RATE),
              audioData,
            ]);
            playAudio(wavBuffer);
            // Cooldown keeps the mic gated briefly so speaker tail / room reverb
            // doesn't feed into the next VAD segment.
            await sleep(POST_PLAYBACK_COOLDOWN_MS);
          }
        } catch (turnError) {
          console.error(
            "\n⚠️  Turn failed:",
            turnError instanceof Error ? turnError.message : turnError,
          );
        } finally {
          isSpeaking = false;
          console.log("\n🎙️  Listening...\n");
        }
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

Speak into the mic; transcriptions and the assistant's spoken responses will follow. Press `Ctrl+C` to quit. Models are downloaded on first run (\~1 GB total) and cached locally; subsequent runs work fully offline.

### Tuning

The defaults are deliberately conservative to prevent the assistant from hearing its own TTS output and looping on itself (a classic failure mode when mic and speakers share the same room). The relevant VAD parameters in the script:

```ts
{
  threshold: 0.6,              // less sensitive than Silero's default
  min_speech_duration_ms: 300, // drops short clicks / breaths / stray words
  min_silence_duration_ms: 700,// long quiet tail before committing a segment
  max_speech_duration_s: 15.0, // caps runaway utterances
  speech_pad_ms: 200,          // edge padding improves accuracy
}
```

Plus three additional safeguards:

* **Mic gate during TTS:** incoming audio is dropped while the assistant speaks, so it cannot transcribe its own output.
* **Post-playback cooldown** (`POST_PLAYBACK_COOLDOWN_MS = 300`): keeps the mic gated for a moment after playback so speaker/room reverb doesn't bleed into the next VAD segment.
* **Minimum utterance length** (`MIN_UTTERANCE_CHARS = 3`): drops single-character or two-letter phantom transcripts like `"you"` or `"."` that Whisper hallucinates from near-silent audio.

### Troubleshooting

If you run into common issues, adjust the values above:

| Symptom                                     | Fix                                                                                                              |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Assistant cuts you off mid-sentence         | Raise `min_silence_duration_ms` to `900-1000`                                                                    |
| Assistant talks over itself / loops forever | Raise `threshold` to `0.7`; raise `min_silence_duration_ms` to `900`; raise `POST_PLAYBACK_COOLDOWN_MS` to `500` |
| Slow to respond after you stop talking      | Lower `min_silence_duration_ms` to `500`                                                                         |
| Picks up background typing / keyboard       | Raise `threshold` to `0.7` and `min_speech_duration_ms` to `400`                                                 |
| Short commands ("yes", "no") are ignored    | Lower `MIN_UTTERANCE_CHARS` to `2`                                                                               |

If you're running with headphones (mic cannot hear the speaker), you can loosen everything: `threshold: 0.5`, `min_silence_duration_ms: 500`, `POST_PLAYBACK_COOLDOWN_MS: 0`.

### Customizing

* **Different ASR model:** swap `WHISPER_TINY` for a larger Whisper model for better transcription accuracy (e.g. `WHISPER_BASE_Q8_0`, `WHISPER_SMALL_Q8_0`, `WHISPER_LARGE_V3_TURBO`, etc.).
* **Different LLM:** swap `LLAMA_3_2_1B_INST_Q4_0` for any LLM constant from `@qvac/sdk`. Larger models give better answers at the cost of latency.
* **Different voice:** replace the Supertonic constants with another TTS model (e.g. Chatterbox — see [Text-to-Speech](/ai-capabilities/text-to-speech)).
* **System prompt:** edit `SYSTEM_PROMPT` at the top of the script. The default instructs the LLM to be concise and avoid markdown so responses are pleasant to listen to.

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>


Translation

# Translation (/ai-capabilities/translation)



## Overview

Translation uses your choice of either [`qvac-fabric-llm.cpp`](https://github.com/tetherto/qvac-fabric-llm.cpp) or [Bergamot](https://browser.mt) as inference engine. Load any supported model using `modelType: "nmt"`, and `modelConfig.engine: "Bergamot"` for Bergamot.

Translation input is defined by:

* `from: string`: source language id (e.g., "en")
* `to: string`: target language id
* `text: string | string[]`: text to be translated

`translate()` returns an object containing `text` and when streaming is enabled, a `tokenStream` for real-time output.

For a list of supported languages and their ids (string abbreviations), see [qvac-sdk/schemas/translation-config.ts](https://github.com/tetherto/qvac/blob/main/packages/sdk/schemas/translation-config.ts).

## Functions

Use the following sequence of function calls:

1. [`loadModel()`](/reference/api#loadmodel)
2. [`translate()`](/reference/api#translate)
3. [`unloadModel()`](/reference/api#unloadmodel)

For how to use each function, see [SDK — API reference](/reference/api/).

## Models

You should load a model compatible with your chosen inference engine:

* `qvac-fabric-llm.cpp` (default): Bergamot or IndicTrans2. Bergamot uses intgemm `*.bin` + `*.spm` vocab files; IndicTrans2 uses GGML `*.bin`.
* Bergamot: Bergamot model bundle. Required files: model `*.bin` + `vocab*.spm`.

For models available as constants, see [SDK — Models](/introduction#models).

## Example

The following script shows an example of translation:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/translation/translation-stream.js title="translation.js" lineNumbers
      import { loadModel, translate, unloadModel, BERGAMOT_EN_ES } from "@qvac/sdk";
      try {
          const modelId = await loadModel({
              modelSrc: BERGAMOT_EN_ES,
              modelConfig: {
                  engine: "Bergamot",
                  from: "en",
                  to: "es",
              },
          });
          console.log(`✅ Model loaded: ${modelId}`);
          const text = "Hello, how are you today? I hope you are having a wonderful day!";
          console.log("\n--- Streaming Translation ---");
          const streamResult = translate({
              modelId,
              text,
              modelType: "nmtcpp-translation",
              stream: true,
          });
          process.stdout.write("Translated text EN -> ES: ");
          for await (const token of streamResult.tokenStream) {
              process.stdout.write(token);
          }
          console.log();
          const stats = await streamResult.stats;
          if (stats) {
              console.log(`Processing stats:`, stats);
          }
          await unloadModel({ modelId, clearStorage: false });
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/translation/translation-stream.ts title="translation.ts" lineNumbers
      import { loadModel, translate, unloadModel, BERGAMOT_EN_ES } from "@qvac/sdk";

      try {
        const modelId = await loadModel({
          modelSrc: BERGAMOT_EN_ES,
          modelConfig: {
            engine: "Bergamot",
            from: "en",
            to: "es",
          },
        });

        console.log(`✅ Model loaded: ${modelId}`);

        const text =
          "Hello, how are you today? I hope you are having a wonderful day!";

        console.log("\n--- Streaming Translation ---");
        const streamResult = translate({
          modelId,
          text,
          modelType: "nmtcpp-translation",
          stream: true,
        });

        process.stdout.write("Translated text EN -> ES: ");
        for await (const token of streamResult.tokenStream) {
          process.stdout.write(token);
        }
        console.log();

        const stats = await streamResult.stats;
        if (stats) {
          console.log(`Processing stats:`, stats);
        }

        await unloadModel({ modelId, clearStorage: false });
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>


VLA

# VLA (/ai-capabilities/vla)



## Overview

Vision-language-action (VLA) inference uses a **GGML** engine ([`@qvac/vla-ggml`](https://github.com/tetherto/qvac/tree/main/packages/vla-ggml)) to run VLA policies. Load a model using `modelType: "vla"`. Then, feed it preprocessed camera frames, the robot's current state, and a tokenized natural-language instruction; the model returns an **action chunk** — `chunkSize` future timesteps of an `actionDim`-dimensional action vector — to drive the robot's actuators.

`vla()` returns `{ actions, actionDim, chunkSize, stats }`, where `actions` is a `Float32Array` of length `chunkSize * actionDim` and `stats` reports per-stage timings (`vision_ms`, `smollm2_total_ms`, `ode_ms`, `total_ms`).

## Functions

Use the following sequence of function calls:

1. [`loadModel()`](/reference/api#loadmodel)
2. [`vlaHparams()`](/reference/api#vlahparams) — to size your input buffers
3. [`vla()`](/reference/api#vla)
4. [`unloadModel()`](/reference/api#unloadmodel)

The SDK also exposes two pure-JS input helpers — `vlaPreprocessImage()` and `vlaPadState()` — to prepare the wire-format tensors expected by `vla()`. They are inlined client-side (no native binding required), so they work under Node, Bun, and Expo even without VLA prebuilds.

For how to use each function, see [SDK — API reference](/reference/api/).

## Models

Supported model families and their file layouts:

* **[SmolVLA](https://huggingface.co/lerobot/smolvla_base)**: single all-in-one `*.gguf` file. Available constant: `SMOLVLA_LIBERO_VISION_Q8`.

More VLA families are planned, and will load through the same `modelType: "vla"` interface.

For models available as constants, see [SDK — Models](/introduction#models).

<Callout type="info">
  **On the input buffers:** `vla()` expects typed-array inputs sized exactly to the model's hparams — images of `hparams.visionImageSize × hparams.visionImageSize`, state of `hparams.maxStateDim`, tokens / mask of `hparams.tokenizerMaxLength`, and an optional noise prior of `hparams.chunkSize × hparams.maxActionDim`. Always call `vlaHparams()` first to size your buffers, and use `vlaPreprocessImage()` / `vlaPadState()` to produce the correct CHW image layout in `[-1, 1]` and zero-padded state vector. The instruction is tokenized on the consumer side using the **SmolVLM2** tokenizer.
</Callout>

## Example

The following script loads SmolVLA-LIBERO from the registry, builds synthetic inputs (zero-filled gray images + BOS-only tokens + zero state), and runs a single inference pass — printing the produced action chunk and per-stage timings:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/vla-smolvla.js title="vla-smolvla.js" lineNumbers
      /**
       * SmolVLA (vision-language-action) example using the QVAC SDK.
       *
       * Loads the SmolVLA-LIBERO GGUF model, runs a single inference pass with
       * synthetic inputs (zero-filled gray images + BOS-only tokens + zero state +
       * zero noise), and prints the produced action chunk + per-stage timings.
       *
       * Usage:
       *   bun examples/vla-smolvla.ts [path-to-smolvla.gguf]
       *
       * By default the example pulls the registry-baked SmolVLA-LIBERO GGUF
       * (~1.9 GB) on first run and caches it locally. Pass an absolute path on
       * the command line to override and load a local GGUF instead.
       */
      import { close, loadModel, SMOLVLA_LIBERO_VISION_Q8, unloadModel, vla, vlaHparams, vlaPadState, vlaPreprocessImage, } from "@qvac/sdk";
      const modelSrcOverride = process.argv[2];
      const modelSrc = modelSrcOverride ?? SMOLVLA_LIBERO_VISION_Q8;
      try {
          console.log("Loading SmolVLA model...");
          const modelId = await loadModel({
              modelSrc,
              modelType: "ggml-vla",
              modelConfig: { backend: "cpu" },
              onProgress: (p) => typeof modelSrc === "string"
                  ? undefined
                  : process.stdout.write(`\rDownloading: ${p.percentage.toFixed(1)}%`),
          });
          if (typeof modelSrc !== "string")
              process.stdout.write("\n");
          console.log(`Model loaded: ${modelId}`);
          const { hparams, backendName } = await vlaHparams({ modelId });
          console.log(`Backend: ${backendName ?? "(unknown)"}`);
          console.log("Hparams:", hparams);
          // Build synthetic inputs sized to the model's expectations. A real
          // consumer would: read camera frames, tokenize the instruction with the
          // SmolVLM2 tokenizer, and read the robot's current end-effector pose.
          const size = hparams.visionImageSize;
          const dummyPixels = new Uint8Array(size * size * 3).fill(128);
          const front = vlaPreprocessImage(dummyPixels, size, size, { size });
          const wrist = vlaPreprocessImage(dummyPixels, size, size, { size });
          const tokens = new Int32Array(hparams.tokenizerMaxLength);
          const mask = new Uint8Array(hparams.tokenizerMaxLength);
          // BOS-only "instruction" for the smoke test.
          tokens[0] = 1;
          mask[0] = 1;
          const state = vlaPadState([0, 0, 0, 0, 0, 0], hparams.maxStateDim);
          const noise = new Float32Array(hparams.chunkSize * hparams.maxActionDim);
          console.log("Running VLA inference...");
          const { actions, actionDim, chunkSize, stats } = await vla({
              modelId,
              images: [front, wrist],
              imgWidth: size,
              imgHeight: size,
              state,
              tokens,
              mask,
              noise,
          });
          console.log(`Got ${chunkSize} action steps of dim ${actionDim}.`);
          console.log("First step:", Array.from(actions.subarray(0, actionDim)));
          if (stats) {
              console.log(`Timing: vision=${stats.vision_ms?.toFixed(0)}ms ` +
                  `smollm2=${stats.smollm2_total_ms?.toFixed(0)}ms ` +
                  `ode=${stats.ode_ms?.toFixed(0)}ms ` +
                  `total=${stats.total_ms?.toFixed(0)}ms`);
          }
          await unloadModel({ modelId, clearStorage: false });
          console.log("Model unloaded.");
          process.exit(0);
      }
      catch (error) {
          console.error("VLA example failed:", error);
          await close();
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/vla-smolvla.ts title="vla-smolvla.ts" lineNumbers
      /**
       * SmolVLA (vision-language-action) example using the QVAC SDK.
       *
       * Loads the SmolVLA-LIBERO GGUF model, runs a single inference pass with
       * synthetic inputs (zero-filled gray images + BOS-only tokens + zero state +
       * zero noise), and prints the produced action chunk + per-stage timings.
       *
       * Usage:
       *   bun examples/vla-smolvla.ts [path-to-smolvla.gguf]
       *
       * By default the example pulls the registry-baked SmolVLA-LIBERO GGUF
       * (~1.9 GB) on first run and caches it locally. Pass an absolute path on
       * the command line to override and load a local GGUF instead.
       */
      import {
        close,
        loadModel,
        SMOLVLA_LIBERO_VISION_Q8,
        unloadModel,
        vla,
        vlaHparams,
        vlaPadState,
        vlaPreprocessImage,
      } from "@qvac/sdk";

      const modelSrcOverride = process.argv[2];
      const modelSrc = modelSrcOverride ?? SMOLVLA_LIBERO_VISION_Q8;

      try {
        console.log("Loading SmolVLA model...");
        const modelId = await loadModel({
          modelSrc,
          modelType: "ggml-vla",
          modelConfig: { backend: "cpu" },
          onProgress: (p) =>
            typeof modelSrc === "string"
              ? undefined
              : process.stdout.write(`\rDownloading: ${p.percentage.toFixed(1)}%`),
        });
        if (typeof modelSrc !== "string") process.stdout.write("\n");
        console.log(`Model loaded: ${modelId}`);

        const { hparams, backendName } = await vlaHparams({ modelId });
        console.log(`Backend: ${backendName ?? "(unknown)"}`);
        console.log("Hparams:", hparams);

        // Build synthetic inputs sized to the model's expectations. A real
        // consumer would: read camera frames, tokenize the instruction with the
        // SmolVLM2 tokenizer, and read the robot's current end-effector pose.
        const size = hparams.visionImageSize;
        const dummyPixels = new Uint8Array(size * size * 3).fill(128);
        const front = vlaPreprocessImage(dummyPixels, size, size, { size });
        const wrist = vlaPreprocessImage(dummyPixels, size, size, { size });

        const tokens = new Int32Array(hparams.tokenizerMaxLength);
        const mask = new Uint8Array(hparams.tokenizerMaxLength);
        // BOS-only "instruction" for the smoke test.
        tokens[0] = 1;
        mask[0] = 1;

        const state = vlaPadState([0, 0, 0, 0, 0, 0], hparams.maxStateDim);
        const noise = new Float32Array(hparams.chunkSize * hparams.maxActionDim);

        console.log("Running VLA inference...");
        const { actions, actionDim, chunkSize, stats } = await vla({
          modelId,
          images: [front, wrist],
          imgWidth: size,
          imgHeight: size,
          state,
          tokens,
          mask,
          noise,
        });

        console.log(`Got ${chunkSize} action steps of dim ${actionDim}.`);
        console.log("First step:", Array.from(actions.subarray(0, actionDim)));
        if (stats) {
          console.log(
            `Timing: vision=${stats.vision_ms?.toFixed(0)}ms ` +
              `smollm2=${stats.smollm2_total_ms?.toFixed(0)}ms ` +
              `ode=${stats.ode_ms?.toFixed(0)}ms ` +
              `total=${stats.total_ms?.toFixed(0)}ms`,
          );
        }

        await unloadModel({ modelId, clearStorage: false });
        console.log("Model unloaded.");
        process.exit(0);
      } catch (error) {
        console.error("VLA example failed:", error);
        await close();
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>

OCR

# OCR (/ai-capabilities/ocr)



## Overview

OCR uses **ONNX runtime** as the inference engine. It runs a two-stage pipeline and requires compatible models for both stages:

* **Text detection**: locate text regions in an image
* **Text recognition**: decode characters in detected regions

Load supported models using `modelType: "ocr"`. Then, provide an image as either a file path (string) or an in-memory buffer. Each OCR block contains extracted text and may include `bbox` (bounding box coordinates) and `confidence` (recognition score).

## Functions

Use the following sequence of function calls:

1. [`loadModel()`](/reference/api#loadmodel)
2. [`ocr()`](/reference/api#ocr)
3. [`unloadModel()`](/reference/api#unloadmodel)

For how to use each function, see [SDK — API reference](/reference/api/).

## Models

You can load any ONNX Runtime-compatible OCR pipeline. Required files: `detector_craft.onnx` + `recognizer_<lang>.onnx` (file format: `*.onnx`).

For models available as constants, see [SDK — Models](/introduction#models).

## Example

The following script shows an example of OCR:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/ocr-fasttext.js title="ocr.js" lineNumbers
      /**
       * OCR example using the QVAC SDK.
       *
       * Usage:
       *   bun examples/ocr-fasttext.ts [path-to-image]
       *
       * This example requires a test image (default: examples/image/basic_test.bmp).
       * Sample images are available in the QVAC source repository, but not included in the published npm package.
       * Pass a custom image path, or download the default image into examples/image/:
       *   https://github.com/tetherto/qvac/blob/main/packages/sdk/examples/image/basic_test.bmp
       */
      import { close, loadModel, ocr, OCR_LATIN_RECOGNIZER_1, unloadModel, } from "@qvac/sdk";
      import path from "path";
      import { fileURLToPath } from "url";
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const imagePath = process.argv[2] || path.join(__dirname, "image/basic_test.bmp");
      try {
          console.log("🚀 Loading OCR model...");
          const modelId = await loadModel({
              modelSrc: OCR_LATIN_RECOGNIZER_1,
              modelConfig: {
                  langList: ["en"],
                  useGPU: true,
                  timeout: 30000,
                  magRatio: 1.5,
                  defaultRotationAngles: [90, 180, 270],
                  contrastRetry: false,
                  lowConfidenceThreshold: 0.5,
                  recognizerBatchSize: 1,
              },
          });
          console.log(`✅ Model loaded successfully! Model ID: ${modelId}`);
          console.log(`\n🔍 Running OCR on: ${imagePath}`);
          const { blocks } = ocr({
              modelId,
              image: imagePath,
              options: {
                  paragraph: false,
              },
          });
          const result = await blocks;
          console.log("\n📝 OCR Results:");
          console.log("================================");
          for (const block of result) {
              console.log(`\n📄 Text: ${block.text}`);
              if (block.bbox) {
                  console.log(`   📍 BBox: [${block.bbox.join(", ")}]`);
              }
              if (block.confidence !== undefined) {
                  console.log(`   ✓ Confidence: ${block.confidence}`);
              }
          }
          console.log("\n================================");
          console.log("\n🔄 Unloading model...");
          await unloadModel({ modelId, clearStorage: false });
          console.log("✅ Model unloaded successfully.");
          process.exit(0);
      }
      catch (error) {
          console.error("❌ Error during OCR processing:", error);
          await close();
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/ocr-fasttext.ts title="ocr.ts" lineNumbers
      /**
       * OCR example using the QVAC SDK.
       *
       * Usage:
       *   bun examples/ocr-fasttext.ts [path-to-image]
       *
       * This example requires a test image (default: examples/image/basic_test.bmp).
       * Sample images are available in the QVAC source repository, but not included in the published npm package.
       * Pass a custom image path, or download the default image into examples/image/:
       *   https://github.com/tetherto/qvac/blob/main/packages/sdk/examples/image/basic_test.bmp
       */
      import {
        close,
        loadModel,
        ocr,
        OCR_LATIN_RECOGNIZER_1,
        unloadModel,
      } from "@qvac/sdk";
      import path from "path";
      import { fileURLToPath } from "url";

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const imagePath =
        process.argv[2] || path.join(__dirname, "image/basic_test.bmp");

      try {
        console.log("🚀 Loading OCR model...");
        const modelId = await loadModel({
          modelSrc: OCR_LATIN_RECOGNIZER_1,
          modelConfig: {
            langList: ["en"],
            useGPU: true,
            timeout: 30000,
            magRatio: 1.5,
            defaultRotationAngles: [90, 180, 270],
            contrastRetry: false,
            lowConfidenceThreshold: 0.5,
            recognizerBatchSize: 1,
          },
        });
        console.log(`✅ Model loaded successfully! Model ID: ${modelId}`);

        console.log(`\n🔍 Running OCR on: ${imagePath}`);
        const { blocks } = ocr({
          modelId,
          image: imagePath,
          options: {
            paragraph: false,
          },
        });

        const result = await blocks;

        console.log("\n📝 OCR Results:");
        console.log("================================");
        for (const block of result) {
          console.log(`\n📄 Text: ${block.text}`);
          if (block.bbox) {
            console.log(`   📍 BBox: [${block.bbox.join(", ")}]`);
          }
          if (block.confidence !== undefined) {
            console.log(`   ✓ Confidence: ${block.confidence}`);
          }
        }
        console.log("\n================================");
        console.log("\n🔄 Unloading model...");
        await unloadModel({ modelId, clearStorage: false });
        console.log("✅ Model unloaded successfully.");
        process.exit(0);
      } catch (error) {
        console.error("❌ Error during OCR processing:", error);
        await close();
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>


Image classification

# Image classification (/ai-capabilities/image-classification)



## Overview

Image classification uses a **GGML** inference engine ([`@qvac/classification-ggml`](https://github.com/tetherto/qvac/tree/main/packages/classification-ggml)). Load a model using `modelType: "classification"`. The addon ships with a bundled MobileNetV3-Small that classifies images into three labels — `"food"`, `"report"`, and `"other"` — so no `modelSrc` and no model download are required out of the box. Custom GGUF classifiers are supported by passing your own `modelSrc`.

Provide an image to `classify()` as a `Uint8Array` of either:

* an encoded **JPEG or PNG** buffer; or
* **raw RGB** bytes, alongside `width`, `height`, and `channels: 3`.

`classify()` returns `ClassificationResult[]` — an array of `{ label, confidence }` entries sorted by confidence in descending order. Use `topK` to limit the number of results returned, either as a load-time default (`modelConfig.topK`) or as a per-call override.

## Functions

Use the following sequence of function calls:

1. [`loadModel()`](/reference/api#loadmodel)
2. [`classify()`](/reference/api#classify)
3. [`unloadModel()`](/reference/api#unloadmodel)

For how to use each function, see [SDK — API reference](/reference/api/).

## Models

Supported model families and their file layouts:

* **MobileNetV3-Small**: single all-in-one `*.gguf` file — the base model or any fine-tune of the same architecture (converted to GGUF). Fine-tunes may define their own classes and labels; the label set is sourced from the GGUF metadata.

For models available as constants, see [SDK — Models](/introduction#models).

<Callout type="info">
  **Default model:** alternatively, you can load no model at all. In that case the base **MobileNetV3-Small** classifier is loaded automatically — no `modelSrc` and no download required. It emits the following fixed labels: `"food"`, `"report"`, and `"other"`.
</Callout>

## Example

The following script classifies a JPEG image using the bundled MobileNetV3-Small model:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/classification/classify-image.js title="classify-image.js" lineNumbers
      import fs from "fs";
      import { startQVACProvider, stopQVACProvider, loadModel, classify, unloadModel, } from "@qvac/sdk";
      /**
       * Classify an image using the bundled MobileNetV3-Small model.
       *
       * The bundled model produces three classes: "food", "report", "other".
       * No modelSrc is needed — the model ships inside @qvac/classification-ggml.
       */
      async function main() {
          await startQVACProvider({});
          const modelId = await loadModel({
              modelType: "ggml-classification",
          });
          const image = fs.readFileSync("image.jpg");
          const results = await classify({ modelId, image });
          console.log("Classification results:");
          for (const { label, confidence } of results) {
              console.log(`  ${label}: ${(confidence * 100).toFixed(1)}%`);
          }
          await unloadModel({ modelId });
          await stopQVACProvider();
      }
      main().catch(console.error);
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/classification/classify-image.ts title="classify-image.ts" lineNumbers
      import fs from "fs";
      import {
        startQVACProvider,
        stopQVACProvider,
        loadModel,
        classify,
        unloadModel,
      } from "@qvac/sdk";

      /**
       * Classify an image using the bundled MobileNetV3-Small model.
       *
       * The bundled model produces three classes: "food", "report", "other".
       * No modelSrc is needed — the model ships inside @qvac/classification-ggml.
       */
      async function main() {
        await startQVACProvider({});

        const modelId = await loadModel({
          modelType: "ggml-classification",
        });

        const image = fs.readFileSync("image.jpg");
        const results = await classify({ modelId, image });

        console.log("Classification results:");
        for (const { label, confidence } of results) {
          console.log(`  ${label}: ${(confidence * 100).toFixed(1)}%`);
        }

        await unloadModel({ modelId });
        await stopQVACProvider();
      }

      main().catch(console.error);
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>


P2P capabilities

Delegated inference

# Delegated inference (/p2p-capabilities/delegated-inference)



## Overview

Lets a **consumer** delegate inference requests to a remote **provider** in a P2P manner over the [Hyperswarm](https://docs.pears.com/building-blocks/hyperswarm) DHT. Use it when an inference requires more resources than the local device is able to provide.

Connectivity is direct: the consumer opens a `dht.connect(providerPublicKey)` connection straight to the provider — there is no topic or discovery phase. The provider exposes itself on the DHT via its keypair, and consumers connect by public key.

Delegation is configured at model-load time by passing a `delegate` object to [`loadModel()`](/reference/api#loadmodel). The provider is started separately using [`startQVACProvider()`](/reference/api#startqvacprovider).

## Functions

**Provider:**

1. [`startQVACProvider()`](/reference/api#startqvacprovider) — bind the DHT server on the provider's keypair and start accepting delegated requests
2. [`stopQVACProvider()`](/reference/api#stopqvacprovider) — stop accepting requests

**Consumer:**

1. [`loadModel()`](/reference/api#loadmodel) — with `delegate` option
2. [`completion()`](/reference/api#completion) / [`transcribe()`](/reference/api#transcribe) / [`translate()`](/reference/api#translate) / etc. — same as local
3. [`unloadModel()`](/reference/api#unloadmodel)

For how to use each function, see [SDK — API reference](/reference/api/).

## Provider

Binds the DHT server on its keypair and serves delegated requests. It publishes its public key; consumers use that key to connect directly.

## Consumer

Creates a delegated model via `loadModel({ delegate: ... })`.
`delegate` main options:

* `providerPublicKey`: provider public key (required)
* `timeout`: request timeout in ms (optional). Use a generous value (e.g. `60_000`) on the first call — cold-DHT bootstrap can take 15–45s. Subsequent calls reuse the open socket and are sub-second.
* `fallbackToLocal`: if `true`, run locally when delegation fails (optional)
* `forceNewConnection`: if `true`, do not reuse cached connections (optional)

## Examples

### Consumer

The following script shows an example of a consumer that delegates `completion()` requests to a provider:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/delegated-inference/consumer.js title="delegated-inference-consumer.js" lineNumbers
      import { completion, LLAMA_3_2_1B_INST_Q4_0, loadModel, close, } from "@qvac/sdk";
      const providerPublicKey = process.argv[2];
      if (!providerPublicKey) {
          console.error("❌ Provider public key is required. Usage: node consumer.ts <provider-public-key> [consumer-seed]");
          process.exit(1);
      }
      try {
          // Optional: Consumer seed for deterministic consumer identity (for firewall testing)
          const consumerSeed = process.argv[3];
          process.env["QVAC_HYPERSWARM_SEED"] = consumerSeed;
          console.log(`🚀 Testing delegated inference`);
          console.log(`🔑 Provider: ${providerPublicKey}`);
          if (consumerSeed) {
              console.log(`🔑 Consumer seed: ${consumerSeed.substring(0, 16)}... (deterministic identity)`);
          }
          else {
              console.log(`🎲 No consumer seed provided (random identity)`);
          }
          const modelId = await loadModel({
              modelSrc: LLAMA_3_2_1B_INST_Q4_0,
              delegate: {
                  providerPublicKey,
                  // Generous timeout for the first call on a cold DHT: bootstrapping
                  // hyperdht and looking up the provider's key can take 15–45s on the
                  // very first run. Subsequent connections in the same process are
                  // sub-second because the DHT is already warm.
                  timeout: 60_000,
                  fallbackToLocal: true, // Optional: Fall back to local inference if delegation fails
                  // forceNewConnection: true, // Optional: Force a new connection instead of reusing cached one
              },
              onProgress: (progress) => {
                  console.log(`📊 Download progress: ${progress.percentage.toFixed(1)}% (${progress.downloaded}/${progress.total} bytes)`);
              },
          });
          console.log(`✅ Delegated model registered: ${modelId}`);
          const response = completion({
              modelId,
              history: [{ role: "user", content: "Hello!" }],
              stream: true,
          });
          for await (const token of response.tokenStream) {
              console.log(`📨 Response: ${token}`);
          }
          console.log("🔍 Stats:", await response.stats);
          console.log("\n🎯 Delegation infrastructure working! Server correctly detected and routed the delegated request.");
          void close();
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/delegated-inference/consumer.ts title="delegated-inference-consumer.ts" lineNumbers
      import {
        completion,
        LLAMA_3_2_1B_INST_Q4_0,
        loadModel,
        close,
      } from "@qvac/sdk";

      const providerPublicKey = process.argv[2];
      if (!providerPublicKey) {
        console.error(
          "❌ Provider public key is required. Usage: node consumer.ts <provider-public-key> [consumer-seed]",
        );
        process.exit(1);
      }

      try {
        // Optional: Consumer seed for deterministic consumer identity (for firewall testing)
        const consumerSeed = process.argv[3];

        process.env["QVAC_HYPERSWARM_SEED"] = consumerSeed;

        console.log(`🚀 Testing delegated inference`);
        console.log(`🔑 Provider: ${providerPublicKey}`);
        if (consumerSeed) {
          console.log(
            `🔑 Consumer seed: ${consumerSeed.substring(0, 16)}... (deterministic identity)`,
          );
        } else {
          console.log(`🎲 No consumer seed provided (random identity)`);
        }

        const modelId = await loadModel({
          modelSrc: LLAMA_3_2_1B_INST_Q4_0,
          delegate: {
            providerPublicKey,
            // Generous timeout for the first call on a cold DHT: bootstrapping
            // hyperdht and looking up the provider's key can take 15–45s on the
            // very first run. Subsequent connections in the same process are
            // sub-second because the DHT is already warm.
            timeout: 60_000,
            fallbackToLocal: true, // Optional: Fall back to local inference if delegation fails
            // forceNewConnection: true, // Optional: Force a new connection instead of reusing cached one
          },
          onProgress: (progress) => {
            console.log(
              `📊 Download progress: ${progress.percentage.toFixed(1)}% (${progress.downloaded}/${progress.total} bytes)`,
            );
          },
        });

        console.log(`✅ Delegated model registered: ${modelId}`);

        const response = completion({
          modelId,
          history: [{ role: "user", content: "Hello!" }],
          stream: true,
        });

        for await (const token of response.tokenStream) {
          console.log(`📨 Response: ${token}`);
        }

        console.log("🔍 Stats:", await response.stats);

        console.log(
          "\n🎯 Delegation infrastructure working! Server correctly detected and routed the delegated request.",
        );

        void close();
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

### Provider

The following script shows an example of starting a provider and printing its `publicKey` for consumers:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/delegated-inference/provider.js title="delegated-inference-provider.js" lineNumbers
      import { startQVACProvider } from "@qvac/sdk";
      // Optional: Seed for deterministic provider identity (64-character hex string)
      const seed = process.argv[2];
      if (seed) {
          process.env["QVAC_HYPERSWARM_SEED"] = seed;
      }
      // Optional: Consumer public key for firewall (allow only this consumer)
      const allowedConsumerPublicKey = process.argv[3];
      console.log(`🚀 Starting provider service...`);
      try {
          if (allowedConsumerPublicKey) {
              console.log(`🔒 Firewall enabled: only allowing consumer ${allowedConsumerPublicKey}`);
          }
          const response = await startQVACProvider({
              firewall: allowedConsumerPublicKey
                  ? {
                      mode: "allow",
                      publicKeys: [allowedConsumerPublicKey],
                  }
                  : undefined,
          });
          console.log("✅ Provider service started successfully!");
          console.log("🔗 Provider is now available for delegated inference requests");
          console.log("");
          console.log("📋 Connection Details:");
          console.log(`   🆔 Provider Public Key: ${response.publicKey}`);
          console.log("");
          console.log("💡 Consumer command:");
          console.log(`   node consumer.ts ${response.publicKey}`);
          console.log("");
          console.log("💡 To reproduce this provider identity:");
          console.log(`   node provider.ts ${seed || "<random-seed>"}`);
          if (!seed) {
              console.log("   (Note: seed was random this time, set one for reproducible identity)");
          }
          console.log("");
          console.log("🔒 For firewall testing:");
          console.log("   1. Generate a consumer seed (64-char hex)");
          console.log("   2. Get consumer public key: getConsumerPublicKey(consumerSeed)");
          console.log("   3. Restart provider with consumer public key as 2nd argument");
          console.log(`   4. Run consumer with: node consumer.ts ${response.publicKey} <consumer-seed>`);
          console.log("📡 Provider is running... Press Ctrl+C to stop");
          process.on("SIGINT", () => {
              console.log("\n🛑 Provider service stopped");
              process.exit(0);
          });
          process.stdin.resume();
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/delegated-inference/provider.ts title="delegated-inference-provider.ts" lineNumbers
      import { startQVACProvider } from "@qvac/sdk";

      // Optional: Seed for deterministic provider identity (64-character hex string)
      const seed: string | undefined = process.argv[2];

      if (seed) {
        process.env["QVAC_HYPERSWARM_SEED"] = seed;
      }

      // Optional: Consumer public key for firewall (allow only this consumer)
      const allowedConsumerPublicKey: string | undefined = process.argv[3];

      console.log(`🚀 Starting provider service...`);

      try {
        if (allowedConsumerPublicKey) {
          console.log(
            `🔒 Firewall enabled: only allowing consumer ${allowedConsumerPublicKey}`,
          );
        }

        const response = await startQVACProvider({
          firewall: allowedConsumerPublicKey
            ? {
                mode: "allow" as const,
                publicKeys: [allowedConsumerPublicKey],
              }
            : undefined,
        });

        console.log("✅ Provider service started successfully!");
        console.log("🔗 Provider is now available for delegated inference requests");
        console.log("");
        console.log("📋 Connection Details:");
        console.log(`   🆔 Provider Public Key: ${response.publicKey}`);
        console.log("");
        console.log("💡 Consumer command:");
        console.log(`   node consumer.ts ${response.publicKey}`);
        console.log("");
        console.log("💡 To reproduce this provider identity:");
        console.log(`   node provider.ts ${seed || "<random-seed>"}`);
        if (!seed) {
          console.log(
            "   (Note: seed was random this time, set one for reproducible identity)",
          );
        }
        console.log("");
        console.log("🔒 For firewall testing:");
        console.log("   1. Generate a consumer seed (64-char hex)");
        console.log(
          "   2. Get consumer public key: getConsumerPublicKey(consumerSeed)",
        );
        console.log(
          "   3. Restart provider with consumer public key as 2nd argument",
        );
        console.log(
          `   4. Run consumer with: node consumer.ts ${response.publicKey} <consumer-seed>`,
        );

        console.log("📡 Provider is running... Press Ctrl+C to stop");
        process.on("SIGINT", () => {
          console.log("\n🛑 Provider service stopped");
          process.exit(0);
        });

        process.stdin.resume();
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>

## Notes

* Consumers do not handle reconnection automatically yet. If the provider restarts, restart the consumer.
* To stop a running provider, call [`stopQVACProvider()`](/reference/api#stopqvacprovider).
* When starting the provider, you can optionally set a firewall rule to allow/deny specific consumer public keys.
* Cold-start DHT bootstrap on the first connect can take 15–45s; subsequent connections in the same process are sub-second.


# Blind relays (/p2p-capabilities/blind-relays)



## Overview

Blind relays help establish peer connections through NAT/firewalls by routing traffic through relay nodes. Use it for model downloads from [our model registry](/introduction#models) and for delegated inference scenarios where peers may be behind restrictive network configurations.

## Configuration

Configure relays via QVAC config file (`qvac.config.json`, `qvac.config.js`, or `qvac.config.ts`) in your project root:

```json
{
  "swarmRelays": ["<relay-public-key-hex>", "<relay-public-key-hex>"]
}
```

## Example

The following script shows a basic example of downloading a model via Hyperdrive with blind relays enabled:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/download-with-blind-relays.js title="blind-relays.js" lineNumbers
      // Set config path before importing SDK - the SDK loads config during initialization
      // This example uses a config file that defines blind relay public keys for improved P2P connectivity
      // Blind relays help establish connections through NAT/firewalls by acting as intermediaries
      const configDir = import.meta.dirname ?? process.cwd();
      process.env["QVAC_CONFIG_PATH"] =
          `${configDir}/config/blind-relay/blind-relay.config.js`;
      import { downloadAsset, close, LLAMA_3_2_1B_INST_Q4_0, loadModel, getModelInfo, unloadModel, } from "@qvac/sdk";
      console.log(`🚀 Download with Blind Relays Example`);
      console.log(`${"=".repeat(60)}\n`);
      try {
          // Config is loaded from examples/config/qvac.config.json (set via QVAC_CONFIG_PATH above)
          // The config contains swarmRelays - an array of Hyperswarm relay public keys
          // These relays help with NAT traversal and firewall bypassing for P2P downloads
          console.log(`📥 Starting model download from Hyperdrive...\n`);
          const startTime = Date.now();
          const modelId = await loadModel({
              modelSrc: LLAMA_3_2_1B_INST_Q4_0,
          });
          console.log(`Model loaded with ID: ${modelId}`);
          const firstStatus = await getModelInfo(LLAMA_3_2_1B_INST_Q4_0);
          console.log(`First status: ${JSON.stringify(firstStatus)}`);
          await unloadModel({ modelId });
          // Download model with progress tracking
          await downloadAsset({
              assetSrc: LLAMA_3_2_1B_INST_Q4_0,
              onProgress: (progress) => {
                  const downloadedMB = (progress.downloaded / 1024 / 1024).toFixed(2);
                  const totalMB = (progress.total / 1024 / 1024).toFixed(2);
                  const percentage = progress.percentage.toFixed(1);
                  const elapsedSeconds = (Date.now() - startTime) / 1000;
                  const speedMBps = (progress.downloaded /
                      1024 /
                      1024 /
                      elapsedSeconds).toFixed(2);
                  console.log(`📊 ${percentage}% - ${downloadedMB}MB / ${totalMB}MB (${speedMBps} MB/s)`);
              },
          });
          console.log(`\n✅ Model downloaded successfully using blind relays!`);
          console.log(`Blind relays helped establish peer connections through NAT/firewalls\n`);
          await close();
      }
      catch (error) {
          console.error("❌ Error:", error);
          console.log(`\nIf download failed, check the relay public keys in:`);
          console.log(`   examples/config/qvac.config.json`);
          console.log(`   (Mock keys in this example won't work in practice!)`);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/download-with-blind-relays.ts title="blind-relays.ts" lineNumbers
      // Set config path before importing SDK - the SDK loads config during initialization
      // This example uses a config file that defines blind relay public keys for improved P2P connectivity
      // Blind relays help establish connections through NAT/firewalls by acting as intermediaries

      const configDir = import.meta.dirname ?? process.cwd();
      process.env["QVAC_CONFIG_PATH"] =
        `${configDir}/config/blind-relay/blind-relay.config.js`;

      import {
        downloadAsset,
        close,
        LLAMA_3_2_1B_INST_Q4_0,
        type ModelProgressUpdate,
        loadModel,
        getModelInfo,
        unloadModel,
      } from "@qvac/sdk";

      console.log(`🚀 Download with Blind Relays Example`);
      console.log(`${"=".repeat(60)}\n`);

      try {
        // Config is loaded from examples/config/qvac.config.json (set via QVAC_CONFIG_PATH above)
        // The config contains swarmRelays - an array of Hyperswarm relay public keys
        // These relays help with NAT traversal and firewall bypassing for P2P downloads

        console.log(`📥 Starting model download from Hyperdrive...\n`);

        const startTime = Date.now();

        const modelId = await loadModel({
          modelSrc: LLAMA_3_2_1B_INST_Q4_0,
        });

        console.log(`Model loaded with ID: ${modelId}`);

        const firstStatus = await getModelInfo(LLAMA_3_2_1B_INST_Q4_0);

        console.log(`First status: ${JSON.stringify(firstStatus)}`);

        await unloadModel({ modelId });

        // Download model with progress tracking
        await downloadAsset({
          assetSrc: LLAMA_3_2_1B_INST_Q4_0,
          onProgress: (progress: ModelProgressUpdate) => {
            const downloadedMB = (progress.downloaded / 1024 / 1024).toFixed(2);
            const totalMB = (progress.total / 1024 / 1024).toFixed(2);
            const percentage = progress.percentage.toFixed(1);
            const elapsedSeconds = (Date.now() - startTime) / 1000;
            const speedMBps = (
              progress.downloaded /
              1024 /
              1024 /
              elapsedSeconds
            ).toFixed(2);

            console.log(
              `📊 ${percentage}% - ${downloadedMB}MB / ${totalMB}MB (${speedMBps} MB/s)`,
            );
          },
        });

        console.log(`\n✅ Model downloaded successfully using blind relays!`);
        console.log(
          `Blind relays helped establish peer connections through NAT/firewalls\n`,
        );

        await close();
      } catch (error) {
        console.error("❌ Error:", error);
        console.log(`\nIf download failed, check the relay public keys in:`);
        console.log(`   examples/config/qvac.config.json`);
        console.log(`   (Mock keys in this example won't work in practice!)`);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>

## Notes

The examples use mock relay keys. For real deployments, you **must** use your own relay servers or trusted public relays.

The same `swarmRelays` config also applies to delegated inference (provider/consumer). Configure it via [`qvac.config.*` file (or `QVAC_CONFIG_PATH`)](https://github.com/tetherto/qvac/blob/main/packages/qvac-sdk/schemas/translation-config.ts) and then start your provider/consumer as usual.

Runtime

# Cancellation (/runtime/cancellation)



## Overview

Every long-running SDK operation that goes through the request registry can be cancelled at any point during execution. Coverage spans inference (`completion()`, `embed()`, `transcribe()`, `translate()`, `textToSpeech()`, `ocr()`, `diffusion()`, `upscale()`), workspace operations (`rag*()`), and resource-acquisition calls (`loadModel()`, `downloadAsset()`). The cancel surface differs by operation — see the coverage callout below for which path applies to which call.

The mental model is: **the primary path is `requestId`** — pass the run's `requestId` to `cancel()` to stop that exact call. **The `modelId` path is an escape hatch** — use it for model unload, app shutdown, admin sweeps, or for ops whose addons cannot interrupt mid-decode (`translate`, `textToSpeech`, `ocr`, `diffusion`, `upscale`).

<Callout title="Coverage" type="info">
  **Targeted cancel by `requestId`** works for: `completion()`, `loadModel()`, `embed()`, `transcribe()`, `downloadAsset()`, and `rag*()` (`ragIngest`, `ragSaveEmbeddings`, `ragReindex`).

  **Broad cancel by `modelId`** additionally covers `translate()`, `textToSpeech()`, `ocr()`, `diffusion()`, and `upscale()`. These accept `cancel({ modelId })` but their addons cannot interrupt mid-decode — the in-flight call stops yielding when `signal.aborted` flips on the next yield point, and the C++ work runs to completion in the background.

  **Duplex sessions** — `transcribeStream(...)` and `textToSpeechStream(...)` use `.destroy()` on the returned session.

  **Finetune** — keeps its own cancel surface: `finetune({ operation: "cancel", ... })`. See [Fine-tuning](/ai-capabilities/fine-tuning).
</Callout>

## Functions

1. [`completion()`](/reference/api#completion) — returns a `CompletionRun` that exposes a synchronous `requestId` field.
2. [`loadModel()`](/reference/api#loadmodel), [`downloadAsset()`](/reference/api#downloadasset), [`embed()`](/reference/api#embed), [`transcribe()`](/reference/api#transcribe), and the [`rag*()`](/ai-capabilities/rag) workspace operations (`ragIngest`, `ragSaveEmbeddings`, `ragReindex`) — return a decorated promise (`Promise<T> & { requestId: string }`) that exposes a synchronous `requestId` field before the first await resolves.
3. [`cancel()`](/reference/api#cancel) — cancel by `requestId` (targeted) or by `modelId` (broad, optionally narrowed by `kind`).

For how to use each function, see [SDK — API reference](/reference/api/).

## Where `requestId` comes from

Two shapes show up across the SDK surface:

* **`completion()`** — returns a `CompletionRun` with `run.requestId` (UUIDv4 generated client-side, available synchronously on the returned run).
* **`loadModel()`, `downloadAsset()`, `embed()`, `transcribe()`, `ragIngest()`, `ragSaveEmbeddings()`, `ragReindex()`** — return `Promise<T> & { requestId: string }`. The await result is unchanged (`await loadModel(...)` still resolves to the model id, `await embed(...)` still resolves to the embedding vector, etc.), but `op.requestId` is available synchronously *before* `await` resolves so a stop button can be wired immediately.

```ts
// Pattern 1 — completion: requestId is on the returned run
const run = completion({ modelId, history, stream: true });
await cancel({ requestId: run.requestId });

// Pattern 2 — decorated promise: op.requestId is synchronously available
const op = loadModel({ modelSrc: "..." });
op.requestId; // synchronously available, before await
stopButton.onclick = () => cancel({ requestId: op.requestId });
const id = await op; // legacy unwrap still returns the modelId
```

## Targeted cancel by `requestId`

Once you have a `requestId` (via either of the two patterns above), cancel is a single call. The `requestId` is available **synchronously** — before the first network round-trip — so you can wire a stop button to it immediately, without waiting for the first chunk to arrive.

There are two equivalent forms:

```ts
const run = completion({ modelId, history, stream: true });

// Sugar form (recommended for most callers)
await cancel({ requestId: run.requestId });

// Explicit form (same behavior)
await cancel({ operation: "request", requestId: run.requestId });
```

Outcome on the consumer side (using `completion()` as the reference):

* The `events` async iterable closes cleanly.
* The terminal `completionDone` event carries `stopReason: "cancelled"`.
* The `final` promise rejects with [`InferenceCancelledError`](/reference/api#errors) (code `52419`).

Other operations that go through `cancel({ requestId })` (`loadModel`, `downloadAsset`, `embed`, `transcribe`, `rag*`) all reject their returned promise with the same `InferenceCancelledError` (code `52419`) — the error class is reused across non-inference handlers, no new code was added.

Only the targeted call is affected — other in-flight calls on the same `modelId` keep running. To cancel `translate`, `textToSpeech`, `ocr`, `diffusion`, or `upscale` — or to sweep every in-flight call on a model in one shot — use the broad-cancel form below.

## Broad cancel by `modelId` (escape hatch)

When you don't have a `requestId` — typically because you're unloading the model, shutting down the app, or sweeping stale requests from admin code — use the broad-cancel form. The canonical 0.11.0 shape is `{ modelId, kind? }`:

```ts
// Cancel every in-flight request on this model, regardless of kind
await cancel({ modelId });

// Narrow to a specific kind
await cancel({ modelId, kind: "completion" });
await cancel({ modelId, kind: "embeddings" });
await cancel({ modelId, kind: "transcribe" });
await cancel({ modelId, kind: "translate" });

// Legacy per-kind sugars — still supported via the client wrapper.
await cancel({ operation: "inference", modelId });
await cancel({ operation: "embeddings", modelId });
```

Broad cancel terminates **every** in-flight request matching the target on the model simultaneously. Prefer the targeted `{ requestId }` form when you do have a `requestId` — it scopes the cancellation precisely and avoids killing unrelated work that happens to share the model.

For ops whose addon does not support mid-decode abort (`translate`, `textToSpeech`, `ocr`, `diffusion`, `upscale`), broad cancel by `modelId` is the only cancel path, and it is **soft** — the in-flight call stops yielding when `signal.aborted` flips on the next yield point, but the underlying C++ work runs to completion in the background. The client's promise still rejects with `InferenceCancelledError`; just don't expect the model to stop computing immediately.

<Callout type="info">
  `loadModel` is per-`requestId` only: the registry slot for an in-progress load is keyed by `requestId` (the model id isn't known until the config hash is computed inside the handler), so `cancel({ modelId })` is a no-op against an in-progress load.
</Callout>

## Soft-cancel caveat for `loadModel`

The download phase of `loadModel()` honors `cancel({ requestId })` end-to-end. The subsequent **addon load phase** (`plugin.createModel(...)` / `model.load(false)`) does not accept a cancellation signal today — a cancel that lands during the load phase still rejects the client's promise with `InferenceCancelledError`, but the addon finishes loading the model into memory in the background.

The result is an **orphan model**: registered as loaded server-side, but the client believes the call failed. If you re-trigger `loadModel()` shortly after a cancel, prefer calling `unloadModel({ modelId })` first (using the model id you can derive deterministically from `modelSrc`) to avoid leaking RAM. A per-load cancel surface on the addon would close this gap; tracked as a follow-up.

## `cancelFinetune` timing change

`finetune({ operation: "cancel", modelId })` (the legacy domain-specific cancel surface for fine-tunes) now returns `{ status: "CANCELLED" }` immediately — the cancel is dispatched synchronously through the registry and the addon's `model.cancel()` runs out-of-band on the in-flight `startFinetune` promise. Previously, the call awaited the addon ack before resolving.

Functionally cancel still lands; observably, `await finetune({ operation: "cancel", ... })` now resolves before the addon has acknowledged. If you previously gated subsequent calls on the cancel-resolution timing, switch to awaiting the original `finetune(...)` handle's `result` to observe the actual training-side termination. The `cancel({ requestId })` path is unchanged across milestones — it has always been synchronous-after-abort.

## History-trim

A cancelled assistant turn is **partial** — the model stopped mid-decode, so its content cuts off in the middle of a thought. Drop it (or mark it as partial) before appending the next user turn to `history` on the follow-up `completion()`. Otherwise the model sees a truncated assistant message as if it were complete, which biases subsequent generations:

```ts
const run = completion({ modelId, history, stream: true });
let cancelled = false;

for await (const event of run.events) {
  if (event.type === "completionDone" && event.stopReason === "cancelled") {
    cancelled = true;
  }
}

const nextHistory = cancelled
  ? history // drop the partial assistant turn
  : [...history, { role: "assistant", content: (await run.final).contentText }];
```

<Callout type="info">
  The same partial-turn rule applies if you abort the `events` iterator early (e.g., `break` out of the `for await` loop) without calling `cancel()`. The model still committed a truncated turn — treat it as partial.
</Callout>

## Example

The following script loads a model, starts a streaming `completion()`, cancels it shortly after by `requestId`, and prints how many content deltas streamed before the cancel took effect:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/cancel-by-request-id.js title="cancel-by-request-id.js" lineNumbers
      /**
       * Cancel a specific in-flight completion by `requestId`.
       *
       * `completion(...)` exposes a stable `requestId` (UUIDv4, generated
       * client-side) on the returned `CompletionRun`. Pass it to
       * `cancel({ requestId })` to abort that exact run without affecting any
       * other inference happening on the same model.
       *
       * Two cancel paths exist:
       *
       *  1. `cancel({ requestId })` — targeted cancel, the primary path
       *     introduced in 0.11.0. The `requestId` is available synchronously
       *     on the `CompletionRun`. Same-tick cancels (issued before the
       *     server has registered the request) are recorded and applied
       *     retroactively when `begin(...)` arrives, so they aren't silently
       *     dropped.
       *  2. `cancel({ operation: "inference", modelId })` — broad cancel
       *     (escape hatch, kept indefinitely). Cancels every inference running
       *     on the model. Useful for unload, app shutdown, admin sweeps when
       *     the caller doesn't have a `requestId` to hand.
       *
       * --- Cancel outcomes (0.11.0+) ---
       *
       * A cancel surfaces on two channels:
       *
       *  - `run.events` ends *normally* with a `completionDone` event carrying
       *    `stopReason: "cancelled"`. The loop exits cleanly, no thrown error.
       *  - `run.text` / `run.final` / `run.stats` / `run.toolCalls` reject
       *    with `InferenceCancelledError(requestId, partial)`, where `partial`
       *    holds whatever the model produced before the cancel landed
       *    (accumulated `text`, completed `toolCalls`, last-known `stats`).
       *
       * Pick the channel that matches how you consume the run: event-loop
       * consumers don't need to catch anything; promise-aggregate consumers
       * pattern-match on `instanceof InferenceCancelledError`.
       */
      import { cancel, completion, loadModel, unloadModel, InferenceCancelledError, QWEN3_600M_INST_Q4, } from "@qvac/sdk";
      try {
          const modelId = await loadModel({
              modelSrc: QWEN3_600M_INST_Q4,
              modelConfig: { ctx_size: 4096 },
          });
          const run = completion({
              modelId,
              history: [
                  {
                      role: "user",
                      content: "Write a long, detailed essay about the history of the Roman Empire.",
                  },
              ],
              stream: true,
          });
          console.log(`requestId: ${run.requestId}`);
          // Cancel after a short delay so we exercise the cancel-mid-decode path.
          setTimeout(() => {
              void cancel({ requestId: run.requestId });
              console.log("(cancel issued)");
          }, 250);
          // Channel 1: the events stream ends normally on cancel. The
          // `completionDone` event's `stopReason` tells you why the loop is
          // about to exit ("eos" | "length" | "cancelled" | "error" | ...).
          let tokenCount = 0;
          let endReason;
          for await (const event of run.events) {
              if (event.type === "contentDelta") {
                  tokenCount++;
                  process.stdout.write(event.text);
              }
              else if (event.type === "completionDone") {
                  endReason = event.stopReason;
              }
          }
          console.log(`\n\nstreamed ${tokenCount} content deltas, stopReason=${endReason}.`);
          // Channel 2: promise-aggregates reject with InferenceCancelledError
          // on cancel. The accumulated state up to the cancel point is preserved
          // on `err.partial`.
          try {
              const text = await run.text;
              console.log(`completed normally (${text.length} chars).`);
          }
          catch (err) {
              if (err instanceof InferenceCancelledError) {
                  console.log(`run.text rejected: cancelled (requestId=${err.requestId})`);
                  console.log(`partial text length: ${(err.partial.text ?? "").length}`);
                  if (err.partial.stats?.tokensPerSecond !== undefined) {
                      console.log(`partial stats: ${err.partial.stats.tokensPerSecond.toFixed(1)} tok/s`);
                  }
                  if (err.partial.toolCalls && err.partial.toolCalls.length > 0) {
                      console.log(`partial tool calls: ${err.partial.toolCalls.length}`);
                  }
              }
              else {
                  throw err;
              }
          }
          await unloadModel({ modelId });
          process.exit(0);
      }
      catch (error) {
          console.error("Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/cancel-by-request-id.ts title="cancel-by-request-id.ts" lineNumbers
      /**
       * Cancel a specific in-flight completion by `requestId`.
       *
       * `completion(...)` exposes a stable `requestId` (UUIDv4, generated
       * client-side) on the returned `CompletionRun`. Pass it to
       * `cancel({ requestId })` to abort that exact run without affecting any
       * other inference happening on the same model.
       *
       * Two cancel paths exist:
       *
       *  1. `cancel({ requestId })` — targeted cancel, the primary path
       *     introduced in 0.11.0. The `requestId` is available synchronously
       *     on the `CompletionRun`. Same-tick cancels (issued before the
       *     server has registered the request) are recorded and applied
       *     retroactively when `begin(...)` arrives, so they aren't silently
       *     dropped.
       *  2. `cancel({ operation: "inference", modelId })` — broad cancel
       *     (escape hatch, kept indefinitely). Cancels every inference running
       *     on the model. Useful for unload, app shutdown, admin sweeps when
       *     the caller doesn't have a `requestId` to hand.
       *
       * --- Cancel outcomes (0.11.0+) ---
       *
       * A cancel surfaces on two channels:
       *
       *  - `run.events` ends *normally* with a `completionDone` event carrying
       *    `stopReason: "cancelled"`. The loop exits cleanly, no thrown error.
       *  - `run.text` / `run.final` / `run.stats` / `run.toolCalls` reject
       *    with `InferenceCancelledError(requestId, partial)`, where `partial`
       *    holds whatever the model produced before the cancel landed
       *    (accumulated `text`, completed `toolCalls`, last-known `stats`).
       *
       * Pick the channel that matches how you consume the run: event-loop
       * consumers don't need to catch anything; promise-aggregate consumers
       * pattern-match on `instanceof InferenceCancelledError`.
       */

      import {
        cancel,
        completion,
        loadModel,
        unloadModel,
        InferenceCancelledError,
        QWEN3_600M_INST_Q4,
      } from "@qvac/sdk";

      try {
        const modelId = await loadModel({
          modelSrc: QWEN3_600M_INST_Q4,
          modelConfig: { ctx_size: 4096 },
        });

        const run = completion({
          modelId,
          history: [
            {
              role: "user",
              content:
                "Write a long, detailed essay about the history of the Roman Empire.",
            },
          ],
          stream: true,
        });

        console.log(`requestId: ${run.requestId}`);

        // Cancel after a short delay so we exercise the cancel-mid-decode path.
        setTimeout(() => {
          void cancel({ requestId: run.requestId });
          console.log("(cancel issued)");
        }, 250);

        // Channel 1: the events stream ends normally on cancel. The
        // `completionDone` event's `stopReason` tells you why the loop is
        // about to exit ("eos" | "length" | "cancelled" | "error" | ...).
        let tokenCount = 0;
        let endReason: string | undefined;
        for await (const event of run.events) {
          if (event.type === "contentDelta") {
            tokenCount++;
            process.stdout.write(event.text);
          } else if (event.type === "completionDone") {
            endReason = event.stopReason;
          }
        }
        console.log(
          `\n\nstreamed ${tokenCount} content deltas, stopReason=${endReason}.`,
        );

        // Channel 2: promise-aggregates reject with InferenceCancelledError
        // on cancel. The accumulated state up to the cancel point is preserved
        // on `err.partial`.
        try {
          const text = await run.text;
          console.log(`completed normally (${text.length} chars).`);
        } catch (err) {
          if (err instanceof InferenceCancelledError) {
            console.log(`run.text rejected: cancelled (requestId=${err.requestId})`);
            console.log(`partial text length: ${(err.partial.text ?? "").length}`);
            if (err.partial.stats?.tokensPerSecond !== undefined) {
              console.log(
                `partial stats: ${err.partial.stats.tokensPerSecond.toFixed(1)} tok/s`,
              );
            }
            if (err.partial.toolCalls && err.partial.toolCalls.length > 0) {
              console.log(`partial tool calls: ${err.partial.toolCalls.length}`);
            }
          } else {
            throw err;
          }
        }

        await unloadModel({ modelId });
        process.exit(0);
      } catch (error) {
        console.error("Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>

## Errors

* `InferenceCancelledError` (code `52419`) — expected on the `final` promise (and any aggregate promise) after a consumer-initiated cancel. Treat it as a normal outcome, not a failure. Carries `requestId` plus a `partial: { text?, toolCalls?, stats? }` payload with whatever was accumulated before the cancel point.
* `RequestNotFoundError` (code `52418`) — registry lookup miss for the given `requestId`. Rare in practice because `cancel({ requestId })` against an already-terminated id is a no-op on the handler (returns `success: true, cancelled: 0`); consumer code that narrows by class will see this for other call sites that look up a request by id.
* `RequestIdConflictError` (code `52417`) — two requests landed with the same `requestId`. Astronomically unlikely with UUIDv4; if you see it, report.
* `RequestRejectedByPolicyError` (code `52420`) — the registry's concurrency policy rejected the request before it began (e.g. `oneAtATimePerModel` for `completion` — the second concurrent completion against the same model is admissibility-rejected). Carries `requestId`, `kind`, `modelId`, and a human-readable `reason`.
* `AsyncDisposeUnavailableError` (code `53503`) — the runtime is missing `Symbol.asyncDispose` (older Bare builds). Upgrade Bare.


# Runtime lifecycle (/runtime/lifecycle)



## Overview

While running, the SDK keeps live resources in the host process — Hyperswarm sockets, Corestore handles, RAG corestore, registered download streams, and a request gate above handler dispatch. When the host app moves to background (mobile suspend, desktop minimize, daemon hibernation), holding those resources open wastes battery and can break sockets that are torn down by the OS.

`suspend()` pauses those resources and engages a lifecycle gate so non-lifecycle operations fail fast instead of hanging. `resume()` restores them when the app returns to foreground. `state()` is the source of truth for the current runtime state — useful for branching app logic without shadow-tracking suspend/resume locally.

`suspend()`, `resume()`, and `state()` are themselves never blocked by the gate, and all three are idempotent.

## Functions

1. `suspend()` — call from the background handler
2. `state()` — read `"active" | "suspending" | "suspended" | "resuming"`
3. `resume()` — call from the foreground handler

For how to use each function, see [SDK — API reference](/reference/api/).

## Lifecycle states

`state()` returns one of:

* `"active"` — all SDK operations are accepted normally
* `"suspending"` — `suspend()` is in progress; non-lifecycle operations are already blocked
* `"suspended"` — runtime is paused; only `suspend()`, `resume()`, `state()` are accepted
* `"resuming"` — `resume()` is in progress; non-lifecycle operations are still blocked

A partial `resume()` failure leaves the runtime in `"suspended"` (not `"active"`), so callers can retry `resume()` without leaking the failed state.

## Behavior while suspended

<Callout type="info">
  While runtime state is not `"active"`, only `suspend()`, `resume()`, and `state()` are accepted. Any other request fails fast with `LIFECYCLE_OPERATION_BLOCKED` instead of hanging.
</Callout>

In-flight operations started **before** `suspend()` follow the matrix below:

| Operation                                          | During suspend                            | After resume                                  |
| -------------------------------------------------- | ----------------------------------------- | --------------------------------------------- |
| P2P / Hyperdrive download                          | Stalls cleanly                            | Continues automatically                       |
| HTTP download                                      | Bypass — bytes keep flowing               | (Already flowing)                             |
| Local native inference (e.g. `completion()`)       | Runs to completion                        | n/a                                           |
| Delegated reply RPC                                | Stalls                                    | Auto-recovers (subject to delegate `timeout`) |
| Delegated stream RPC                               | Severed; consumer iterator hangs silently | Not recovered — re-issue after `resume()`     |
| New operation (e.g. `completion()`, `loadModel()`) | Throws `LIFECYCLE_OPERATION_BLOCKED`      | Accepted                                      |

## Example

The following script loads a model, runs a completion, suspends the runtime, demonstrates that a new `completion()` is blocked while suspended, then resumes and runs another completion. `state()` is sampled at each step:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/suspend-resume.js title="runtime-lifecycle.js" lineNumbers
      import { loadModel, LLAMA_3_2_1B_INST_Q4_0, completion, unloadModel, suspend, resume, state, } from "@qvac/sdk";
      try {
          // Load a model
          const modelId = await loadModel({
              modelSrc: LLAMA_3_2_1B_INST_Q4_0,
              onProgress: (progress) => {
                  console.log(progress);
              },
          });
          console.log("✅ Model loaded\n");
          console.log(`📊 Lifecycle state: ${await state()}\n`);
          // Run a completion before suspending
          console.log("--- Completion before suspend ---");
          const result1 = completion({
              modelId,
              history: [{ role: "user", content: "Say hello in one word" }],
              stream: true,
          });
          for await (const token of result1.tokenStream) {
              process.stdout.write(token);
          }
          console.log("\n");
          // Suspend all networking and storage (e.g. app going to background)
          console.log("⏸️  Suspending...");
          await suspend();
          console.log(`📊 Lifecycle state: ${await state()}\n`);
          try {
              await completion({
                  modelId,
                  history: [{ role: "user", content: "This should fail" }],
                  stream: false,
              }).text;
          }
          catch (error) {
              const name = error.name;
              if (name === "LIFECYCLE_OPERATION_BLOCKED") {
                  console.log(`🚫 Operation blocked while suspended (${name})`);
              }
              else {
                  throw error;
              }
          }
          // Simulate time in background
          console.log("\n💤 Simulating 3 seconds in background...");
          await new Promise((resolve) => setTimeout(resolve, 3000));
          // Resume when returning to foreground
          console.log("▶️  Resuming...");
          await resume();
          console.log(`📊 Lifecycle state: ${await state()}\n`);
          // Run another completion after resuming
          console.log("--- Completion after resume ---");
          const result2 = completion({
              modelId,
              history: [{ role: "user", content: "Say goodbye in one word" }],
              stream: true,
          });
          for await (const token of result2.tokenStream) {
              process.stdout.write(token);
          }
          console.log("\n");
          await unloadModel({ modelId });
          console.log("✅ Model unloaded");
          process.exit(0);
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/suspend-resume.ts title="runtime-lifecycle.ts" lineNumbers
      import {
        loadModel,
        LLAMA_3_2_1B_INST_Q4_0,
        completion,
        unloadModel,
        suspend,
        resume,
        state,
      } from "@qvac/sdk";

      try {
        // Load a model
        const modelId = await loadModel({
          modelSrc: LLAMA_3_2_1B_INST_Q4_0,
          onProgress: (progress) => {
            console.log(progress);
          },
        });

        console.log("✅ Model loaded\n");

        console.log(`📊 Lifecycle state: ${await state()}\n`);

        // Run a completion before suspending
        console.log("--- Completion before suspend ---");
        const result1 = completion({
          modelId,
          history: [{ role: "user", content: "Say hello in one word" }],
          stream: true,
        });
        for await (const token of result1.tokenStream) {
          process.stdout.write(token);
        }
        console.log("\n");

        // Suspend all networking and storage (e.g. app going to background)
        console.log("⏸️  Suspending...");
        await suspend();
        console.log(`📊 Lifecycle state: ${await state()}\n`);

        try {
          await completion({
            modelId,
            history: [{ role: "user", content: "This should fail" }],
            stream: false,
          }).text;
        } catch (error: unknown) {
          const name = (error as { name?: string }).name;
          if (name === "LIFECYCLE_OPERATION_BLOCKED") {
            console.log(`🚫 Operation blocked while suspended (${name})`);
          } else {
            throw error;
          }
        }

        // Simulate time in background
        console.log("\n💤 Simulating 3 seconds in background...");
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Resume when returning to foreground
        console.log("▶️  Resuming...");
        await resume();
        console.log(`📊 Lifecycle state: ${await state()}\n`);

        // Run another completion after resuming
        console.log("--- Completion after resume ---");
        const result2 = completion({
          modelId,
          history: [{ role: "user", content: "Say goodbye in one word" }],
          stream: true,
        });
        for await (const token of result2.tokenStream) {
          process.stdout.write(token);
        }
        console.log("\n");

        await unloadModel({ modelId });
        console.log("✅ Model unloaded");
        process.exit(0);
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>


# Logging (/runtime/logging)



## Overview

QVAC provides two complementary logging primitives:

* `loggingStream()`: stream real-time logs emitted by the SDK server and native addons (llamacpp, whispercpp, etc.). You decide what to do with each log line (print, persist, filter).
* `getLogger()`: create a logger for your own application code (namespaced, configurable level, optional transports).

## Functions

1. [`getLogger()`](/reference/api) — create a logger
2. [`loadModel()`](/reference/api#loadmodel) — pass logger via `logger` option
3. [`loggingStream()`](/reference/api#loggingstream) — stream real-time logs from models or SDK server

For how to use each function, see [SDK — API reference](/reference/api/).

## Flow

1. Pass a logger when loading your model.
2. When logging is enabled, you'll see real-time logs from the underlying model libraries:

```
[DEBUG] llamacpp:llm: Loading model weights...
[INFO] llamacpp:llm: Model loaded successfully, vocab_size=32000
[DEBUG] llamacpp:llm: Starting inference...
[DEBUG] llamacpp:llm: Inference completed, tokens=12
```

## Features

* **Streaming API (`loggingStream`)** — Consume real-time logs programmatically. Stream either:
  * SDK server logs using `SDK_LOG_ID`, or
  * per-model addon logs using the model ID returned by `loadModel()`.

* **Logger API (`getLogger`)** — Create loggers for your application code with custom transports. Console output enabled by default; set `enableConsole: false` to use only custom transports.

It works for all model types (LLM, Whisper, NMT, Embeddings) and provides valuable insight into model performance and behavior.

## Configuration

To configure global logging (level and console output), use a config file (`qvac.config.json`, `qvac.config.js`, or `qvac.config.ts`) and set:

* `loggerLevel`: `"error" | "warn" | "info" | "debug"`
* `loggerConsoleOutput`: `boolean`

## Example

The following script shows an example of streaming logs from loaded models:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/logging-streaming.js title="logging.js" lineNumbers
      import { loadModel, completion, unloadModel, loggingStream, SDK_LOG_ID, LLAMA_3_2_1B_INST_Q4_0, GTE_LARGE_FP16, VERBOSITY, embed, } from "@qvac/sdk";
      try {
          console.log("🚀 Starting log streaming demo...\n");
          // Note: To configure logging (level and console output), use config file:
          // { "loggerLevel": "debug", "loggerConsoleOutput": false } in qvac.config.json/js/ts
          // Subscribe to SDK server logs in background
          console.log("📡 Starting SDK server log stream...\n");
          (async () => {
              for await (const log of loggingStream({ id: SDK_LOG_ID })) {
                  console.log(`[SDK] [${log.level.toUpperCase()}] [${log.namespace}] ${log.message}`);
              }
          })().catch(() => {
              // Stream terminated - normal on shutdown
          });
          // Load models
          console.log("📥 Loading models (watch SDK logs above)...\n");
          const llmModelId = await loadModel({
              modelSrc: LLAMA_3_2_1B_INST_Q4_0,
              modelConfig: {
                  ctx_size: 2048,
                  temp: 0.7,
                  verbosity: VERBOSITY.ERROR, // Only log errors, remaining logs are captured by loggingStream
              },
          });
          const embedModelId = await loadModel({
              modelSrc: GTE_LARGE_FP16,
          });
          console.log("📡 Starting model-specific log streams...\n");
          (async () => {
              for await (const log of loggingStream({ id: llmModelId })) {
                  const timestamp = new Date(log.timestamp).toISOString();
                  console.log(`[LLM] [${timestamp}] [${log.level.toUpperCase()}] ${log.namespace}: ${log.message}`);
              }
          })().catch(() => {
              // Stream terminated - this is normal when model unloads
          });
          (async () => {
              for await (const log of loggingStream({ id: embedModelId })) {
                  const timestamp = new Date(log.timestamp).toISOString();
                  console.log(`[EMBED] [${timestamp}] [${log.level.toUpperCase()}] ${log.namespace}: ${log.message}`);
              }
          })().catch(() => {
              // Stream terminated - this is normal when model unloads
          });
          const messages = [
              { role: "user", content: "Count from 1 to 5 and explain each number." },
          ];
          const result = completion({
              modelId: llmModelId,
              history: messages,
              stream: true,
          });
          const { embedding } = await embed({
              modelId: embedModelId,
              text: messages[0]?.content ?? "Hello, world!",
          });
          console.log("📝 Response:\n");
          for await (const token of result.tokenStream) {
              process.stdout.write(token);
          }
          console.log("Embedding (first 20 elements)", embedding.slice(0, 20));
          console.log("Embeddings length", embedding.length);
          console.log("\n💡 Notice three log streams running:\n" +
              "   - [SDK] = SDK server operations\n" +
              "   - [LLM] = LLM model inference logs\n" +
              "   - [EMBED] = Embedding model logs\n");
          await unloadModel({ modelId: llmModelId, clearStorage: false });
          await unloadModel({ modelId: embedModelId, clearStorage: false });
      }
      catch (error) {
          console.error("❌ Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/logging-streaming.ts title="logging.ts" lineNumbers
      import {
        loadModel,
        completion,
        unloadModel,
        loggingStream,
        SDK_LOG_ID,
        LLAMA_3_2_1B_INST_Q4_0,
        GTE_LARGE_FP16,
        VERBOSITY,
        embed,
      } from "@qvac/sdk";

      try {
        console.log("🚀 Starting log streaming demo...\n");

        // Note: To configure logging (level and console output), use config file:
        // { "loggerLevel": "debug", "loggerConsoleOutput": false } in qvac.config.json/js/ts

        // Subscribe to SDK server logs in background
        console.log("📡 Starting SDK server log stream...\n");
        (async () => {
          for await (const log of loggingStream({ id: SDK_LOG_ID })) {
            console.log(
              `[SDK] [${log.level.toUpperCase()}] [${log.namespace}] ${log.message}`,
            );
          }
        })().catch(() => {
          // Stream terminated - normal on shutdown
        });

        // Load models
        console.log("📥 Loading models (watch SDK logs above)...\n");
        const llmModelId = await loadModel({
          modelSrc: LLAMA_3_2_1B_INST_Q4_0,
          modelConfig: {
            ctx_size: 2048,
            temp: 0.7,
            verbosity: VERBOSITY.ERROR, // Only log errors, remaining logs are captured by loggingStream
          },
        });

        const embedModelId = await loadModel({
          modelSrc: GTE_LARGE_FP16,
        });

        console.log("📡 Starting model-specific log streams...\n");
        (async () => {
          for await (const log of loggingStream({ id: llmModelId })) {
            const timestamp = new Date(log.timestamp).toISOString();
            console.log(
              `[LLM] [${timestamp}] [${log.level.toUpperCase()}] ${log.namespace}: ${log.message}`,
            );
          }
        })().catch(() => {
          // Stream terminated - this is normal when model unloads
        });

        (async () => {
          for await (const log of loggingStream({ id: embedModelId })) {
            const timestamp = new Date(log.timestamp).toISOString();
            console.log(
              `[EMBED] [${timestamp}] [${log.level.toUpperCase()}] ${log.namespace}: ${log.message}`,
            );
          }
        })().catch(() => {
          // Stream terminated - this is normal when model unloads
        });
        const messages = [
          { role: "user", content: "Count from 1 to 5 and explain each number." },
        ];

        const result = completion({
          modelId: llmModelId,
          history: messages,
          stream: true,
        });
        const { embedding } = await embed({
          modelId: embedModelId,
          text: messages[0]?.content ?? "Hello, world!",
        });

        console.log("📝 Response:\n");
        for await (const token of result.tokenStream) {
          process.stdout.write(token);
        }

        console.log("Embedding (first 20 elements)", embedding.slice(0, 20));
        console.log("Embeddings length", embedding.length);

        console.log(
          "\n💡 Notice three log streams running:\n" +
            "   - [SDK] = SDK server operations\n" +
            "   - [LLM] = LLM model inference logs\n" +
            "   - [EMBED] = Embedding model logs\n",
        );

        await unloadModel({ modelId: llmModelId, clearStorage: false });
        await unloadModel({ modelId: embedModelId, clearStorage: false });
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>


# Profiler (/runtime/profiler)



## Overview

`@qvac/sdk` npm package exposes a `profiler` object that you can import and use to measure and analyze how long SDK operations take in your application. You can enable profiling in two ways:

* [**Global:**](#enable-global) call `profiler.enable()` to profile all subsequent operations until `profiler.disable()` is called.
* [**Per-call:**](#enable-per-call) pass `{ profiling: { enabled: true } }` in the options of an individual function call.

You can also enable profiling globally and use a per-call override to [opt out](#opt-out) of specific calls by passing `{ profiling: { enabled: false } }`. Data collected through both modes is stored in and exported from the same `profiler` singleton. See [Support](#support) for the list of SDK operations that support profiling.

<Callout type="info">
  `profiler` is a process-wide singleton — its state persists until the process exits.
</Callout>

## `profiler`

The `profiler` object provides the following methods:

1. `profiler.enable(options?)` — enable profiling globally
2. `profiler.isEnabled()` — return whether profiling is enabled
3. `profiler.onRecord(callback)` — subscribe to profiling events in real time
4. Export collected data using any of the following:
   * `profiler.exportSummary()` — return a high-level summary string
   * `profiler.exportTable()` — return a detailed table of aggregated metrics
   * `profiler.exportJSON(options?)` — return a full export as structured JSON
5. `profiler.disable()` — disable profiling
6. `profiler.clear()` — clear collected data

See [API — `profiler`](/reference/api#profiler) for the complete reference, including the full metrics catalog for each export function and detailed usage.

## Enable profiling

By default, profiling is disabled. You can enable it [globally](#enable-global) or [per-call](#enable-per-call). If you enable profiling globally, you can [opt out](#opt-out) of individual function calls.

### Global

Enable profiling globally by calling `profiler.enable()`:

```ts
import { profiler } from "@qvac/sdk";

profiler.enable({
  mode: "verbose",                 // "summary" (default) | "verbose"
  includeServerBreakdown: true,    // include server-side timing in responses
  operationFilters: ["completion"], // only profile these operations (empty = all)
});
```

### Per-call

To profile a single call, pass the `profiling` option when invoking the function:

```ts
await embed(
  { modelId, text: "hello" },
  {
    profiling: {
      enabled: true,
      includeServerBreakdown: true,
      mode: "verbose",
    },
  },
);
```

See [Support](#support) for the list of functions that accept the `profiling` option.

### Opt-out

If you enabled profiling [globally](#enable-global), you can pass the `profiling` option to opt out of a specific call:

```ts
await embed(
  { modelId, text: "hello" },
  { profiling: { enabled: false } },
);
```

## Support

The following SDK operations support profiling:

[`completion()`](/reference/api#completion) | [`downloadAsset()`](/reference/api#downloadasset) | [`embed()`](/reference/api#embed) | [`invokePlugin()`](/reference/api#invokeplugin) | [`invokePluginStream()`](/reference/api#invokepluginstream) | [`loadModel()`](/reference/api#loadmodel) | [`ocr()`](/reference/api#ocr) | [`ragChunk()`](/reference/api#ragchunk) | [`ragCloseWorkspace()`](/reference/api#ragcloseworkspace) | [`ragDeleteEmbeddings()`](/reference/api#ragdeleteembeddings) | [`ragDeleteWorkspace()`](/reference/api#ragdeleteworkspace) | [`ragIngest()`](/reference/api#ragingest) | [`ragListWorkspaces()`](/reference/api#raglistworkspaces) | [`ragReindex()`](/reference/api#ragreindex) | [`ragSaveEmbeddings()`](/reference/api#ragsaveembeddings) | [`ragSearch()`](/reference/api#ragsearch) | [`textToSpeech()`](/reference/api#texttospeech) | [`transcribe()`](/reference/api#transcribe) | [`transcribeStream()`](/reference/api#transcribestream) | [`translate()`](/reference/api#translate)

## Examples

### Global

The following script enables profiling globally, loads a model, runs a completion, and exports timing data in all available formats:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/profiling/basic.js title="profiling-basic.js" lineNumbers
      import { completion, loadModel, unloadModel, LLAMA_3_2_1B_INST_Q4_0, profiler, } from "@qvac/sdk";
      try {
          // Enable profiling globally
          profiler.enable({
              mode: "verbose",
              includeServerBreakdown: true,
          });
          console.log("Profiler enabled:", profiler.isEnabled());
          const modelId = await loadModel({
              modelSrc: LLAMA_3_2_1B_INST_Q4_0,
              onProgress: (p) => console.log(`  ${p.percentage.toFixed(1)}%`),
          });
          console.log("Model loaded:", modelId);
          console.log("\n→ Running completion...");
          const result = completion({
              modelId,
              history: [{ role: "user", content: "Say hello in one sentence." }],
              stream: true,
          });
          for await (const token of result.tokenStream) {
              process.stdout.write(token);
          }
          console.log();
          await unloadModel({ modelId });
          // Export profiling data
          console.log("\n=== Profiler Summary ===");
          console.log(profiler.exportSummary());
          console.log("\n=== Profiler Table ===");
          console.log(profiler.exportTable());
          const json = profiler.exportJSON();
          console.log("\n=== Load Model Metrics ===");
          // Filter for operation-level event (kind: "handler"), not RPC phase events
          const loadModelEvent = json.recentEvents?.find((e) => e.op === "loadModel" && e.kind === "handler");
          if (loadModelEvent) {
              const tags = loadModelEvent.tags ?? {};
              const gauges = loadModelEvent.gauges ?? {};
              console.log("  sourceType:", tags["sourceType"] ?? "(not set)");
              console.log("  cacheHit:", tags["cacheHit"] ?? "(not set)");
              console.log("  totalLoadTime:", gauges["totalLoadTime"], "ms");
              console.log("  modelInitializationTime:", gauges["modelInitializationTime"], "ms");
              if (tags["cacheHit"] !== "true") {
                  console.log("  downloadTime:", gauges["downloadTime"] ?? "(cached)", "ms");
                  console.log("  totalBytesDownloaded:", gauges["totalBytesDownloaded"] ?? "(cached)");
                  console.log("  downloadSpeedBps:", gauges["downloadSpeedBps"] ?? "(cached)");
              }
              else {
                  console.log("  (download metrics omitted - cache hit)");
              }
              if (gauges["checksumValidationTime"] !== undefined) {
                  console.log("  checksumValidationTime:", gauges["checksumValidationTime"], "ms");
              }
          }
          else {
              console.log("  (no loadModel handler event captured)");
              // Debug: show what ops are available
              const ops = [
                  ...new Set(json.recentEvents?.map((e) => `${e.op}:${e.kind}`) ?? []),
              ];
              console.log("  Available ops:", ops.join(", "));
          }
          console.log("\n=== Profiler JSON (structure) ===");
          console.log("  aggregates:", Object.keys(json.aggregates).length, "metrics");
          console.log("  recentEvents:", json.recentEvents?.length ?? 0, "events");
          console.log("  config:", json.config);
          // Disable profiling
          profiler.disable();
          console.log("\nProfiler disabled:", !profiler.isEnabled());
      }
      catch (error) {
          console.error("Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/profiling/basic.ts title="profiling-basic.ts" lineNumbers
      import {
        completion,
        loadModel,
        unloadModel,
        LLAMA_3_2_1B_INST_Q4_0,
        profiler,
      } from "@qvac/sdk";

      try {
        // Enable profiling globally
        profiler.enable({
          mode: "verbose",
          includeServerBreakdown: true,
        });
        console.log("Profiler enabled:", profiler.isEnabled());

        const modelId = await loadModel({
          modelSrc: LLAMA_3_2_1B_INST_Q4_0,
          onProgress: (p) => console.log(`  ${p.percentage.toFixed(1)}%`),
        });
        console.log("Model loaded:", modelId);

        console.log("\n→ Running completion...");
        const result = completion({
          modelId,
          history: [{ role: "user", content: "Say hello in one sentence." }],
          stream: true,
        });

        for await (const token of result.tokenStream) {
          process.stdout.write(token);
        }
        console.log();

        await unloadModel({ modelId });

        // Export profiling data
        console.log("\n=== Profiler Summary ===");
        console.log(profiler.exportSummary());

        console.log("\n=== Profiler Table ===");
        console.log(profiler.exportTable());

        const json = profiler.exportJSON();
        console.log("\n=== Load Model Metrics ===");
        // Filter for operation-level event (kind: "handler"), not RPC phase events
        const loadModelEvent = json.recentEvents?.find(
          (e) => e.op === "loadModel" && e.kind === "handler",
        );
        if (loadModelEvent) {
          const tags = loadModelEvent.tags ?? {};
          const gauges = loadModelEvent.gauges ?? {};
          console.log("  sourceType:", tags["sourceType"] ?? "(not set)");
          console.log("  cacheHit:", tags["cacheHit"] ?? "(not set)");
          console.log("  totalLoadTime:", gauges["totalLoadTime"], "ms");
          console.log(
            "  modelInitializationTime:",
            gauges["modelInitializationTime"],
            "ms",
          );
          if (tags["cacheHit"] !== "true") {
            console.log(
              "  downloadTime:",
              gauges["downloadTime"] ?? "(cached)",
              "ms",
            );
            console.log(
              "  totalBytesDownloaded:",
              gauges["totalBytesDownloaded"] ?? "(cached)",
            );
            console.log(
              "  downloadSpeedBps:",
              gauges["downloadSpeedBps"] ?? "(cached)",
            );
          } else {
            console.log("  (download metrics omitted - cache hit)");
          }
          if (gauges["checksumValidationTime"] !== undefined) {
            console.log(
              "  checksumValidationTime:",
              gauges["checksumValidationTime"],
              "ms",
            );
          }
        } else {
          console.log("  (no loadModel handler event captured)");
          // Debug: show what ops are available
          const ops = [
            ...new Set(json.recentEvents?.map((e) => `${e.op}:${e.kind}`) ?? []),
          ];
          console.log("  Available ops:", ops.join(", "));
        }

        console.log("\n=== Profiler JSON (structure) ===");
        console.log("  aggregates:", Object.keys(json.aggregates).length, "metrics");
        console.log("  recentEvents:", json.recentEvents?.length ?? 0, "events");
        console.log("  config:", json.config);

        // Disable profiling
        profiler.disable();
        console.log("\nProfiler disabled:", !profiler.isEnabled());
      } catch (error) {
        console.error("Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

### Per-call

The following script keeps the profiler disabled globally and selectively profiles individual `embed()` calls using the per-call option:

<Tabs>
  <Tab value="js" label="JavaScript" default>
    <WrapCode>
      ```js file=<rootDir>/packages/sdk/dist/examples/profiling/per-call.js title="profiling-per-call.js" lineNumbers
      import { embed, loadModel, unloadModel, GTE_LARGE_FP16, profiler, } from "@qvac/sdk";
      try {
          profiler.disable();
          console.log("Profiler globally enabled:", profiler.isEnabled());
          const modelId = await loadModel({
              modelSrc: GTE_LARGE_FP16,
              onProgress: (p) => console.log(`  ${p.percentage.toFixed(1)}%`),
          });
          console.log("Model loaded:", modelId);
          console.log("\n=== Embed with per-call profiling ===");
          const { embedding: embedding1 } = await embed({ modelId, text: "Profile this specific call" }, { profiling: { enabled: true, includeServerBreakdown: true } });
          console.log("Embedding dimensions:", embedding1.length);
          console.log("\n=== Embed without profiling ===");
          const { embedding: embedding2 } = await embed({
              modelId,
              text: "This call is not profiled",
          });
          console.log("Embedding dimensions:", embedding2.length);
          console.log("\n=== Embed with profiling explicitly disabled ===");
          const { embedding: embedding3 } = await embed({ modelId, text: "Profiling explicitly disabled for this call" }, { profiling: { enabled: false } });
          console.log("Embedding dimensions:", embedding3.length);
          await unloadModel({ modelId });
          console.log("\n=== Profiler Summary (per-call data only) ===");
          console.log(profiler.exportSummary());
      }
      catch (error) {
          console.error("Error:", error);
          process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>

  <Tab value="ts" label="TypeScript">
    <WrapCode>
      ```ts file=<rootDir>/packages/sdk/examples/profiling/per-call.ts title="profiling-per-call.ts" lineNumbers
      import {
        embed,
        loadModel,
        unloadModel,
        GTE_LARGE_FP16,
        profiler,
      } from "@qvac/sdk";

      try {
        profiler.disable();
        console.log("Profiler globally enabled:", profiler.isEnabled());

        const modelId = await loadModel({
          modelSrc: GTE_LARGE_FP16,
          onProgress: (p) => console.log(`  ${p.percentage.toFixed(1)}%`),
        });
        console.log("Model loaded:", modelId);

        console.log("\n=== Embed with per-call profiling ===");
        const { embedding: embedding1 } = await embed(
          { modelId, text: "Profile this specific call" },
          { profiling: { enabled: true, includeServerBreakdown: true } },
        );
        console.log("Embedding dimensions:", embedding1.length);

        console.log("\n=== Embed without profiling ===");
        const { embedding: embedding2 } = await embed({
          modelId,
          text: "This call is not profiled",
        });
        console.log("Embedding dimensions:", embedding2.length);

        console.log("\n=== Embed with profiling explicitly disabled ===");
        const { embedding: embedding3 } = await embed(
          { modelId, text: "Profiling explicitly disabled for this call" },
          { profiling: { enabled: false } },
        );
        console.log("Embedding dimensions:", embedding3.length);

        await unloadModel({ modelId });

        console.log("\n=== Profiler Summary (per-call data only) ===");
        console.log(profiler.exportSummary());
      } catch (error) {
        console.error("Error:", error);
        process.exit(1);
      }
      ```
    </WrapCode>
  </Tab>
</Tabs>

<Callout type="success">
  **Tip:** all examples throughout this documentation are self-contained and runnable. For instructions on how to run them, see [SDK quickstart](/quickstart).
</Callout>
