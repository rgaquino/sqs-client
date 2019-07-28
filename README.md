# sqs-client

[![Build Status](https://travis-ci.org/rgaquino/sqs-client.svg?branch=master)](https://travis-ci.org/rgaquino/sqs-client)

A local GUI to manage AWS SQS and Active MQ containers built using Electron and React.

![screenshotA](https://raw.githubusercontent.com/rgaquino/sqs-client/master/screenshotA.png)

![screenshotB](https://raw.githubusercontent.com/rgaquino/sqs-client/master/screenshotB.png)

## Table of Contents
- [Download](#download)
- [Build from Source](#build)
- [ActiveMQ Installation](#activemq)
- [Disclaimer](#disclaimer)

## Download

Latest artifacts can be downloaded here: https://github.com/rgaquino/sqs-client/releases

## Build

### Pre-requisities

To be able to build from source, you need Node.js installed on your machine.

1. Install Node via Homebrew

```
$ brew install node
```

2. Install using binaries: https://nodejs.org/en/download/

### Installation steps

1. Run a dev build

```
$ git clone https://github.com/rgaquino/sqs-client.git
$ npm install
$ npm start
```

2. Creating a packaged version

```
$ npm run make
```

## ActiveMQ

If you want a local Docker container that has compatible interfaces to AWS SQS, pull the following project:

```
docker pull rgaquino/alpine-sqs
```

Or build the image from scratch:

```
git clone https://github.com/rgaquino/alpine-sqs.git
```

## Disclaimer
- This is only a rough project that I created to learn how to integrate React with Electron.
- The queue message list is using a temporary cache and does not reflect the actual messages in the queues, similar to the following project: https://github.com/kobim/sqs-insight