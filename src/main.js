import { endGroup as ghactionsEndGroup, error as ghactionsError, getBooleanInput as ghactionsGetBooleanInput, getInput as ghactionsGetInput, setOutput as ghactionsSetOutput, setSecret as ghactionsSetSecret, startGroup as ghactionsStartGroup, warning as ghactionsWarning } from "@actions/core";
import { isJSON, isString, isStringifyJSON } from "@hugoalh/advanced-determine";
import chalk from "chalk";
import nodeFetch from "node-fetch";
import yaml from "yaml";
try {
	const iftttMakerURLRegExp = /^(?:https:\/\/maker\.ifttt\.com\/use\/)?(?<key>(?:[\da-zA-Z][\da-zA-Z_-]*)?[\da-zA-Z])$/u;
	ghactionsStartGroup(`Import inputs.`);
	let eventName = ghactionsGetInput("eventname");
	if (!isString(eventName, { pattern: /^(?:[\da-zA-Z][\da-zA-Z_]*)?[\da-zA-Z]$/u })) {
		throw new TypeError(`\`${eventName}\` is not a valid IFTTT webhook event name!`);
	}
	console.log(`${chalk.bold("Event Name:")} ${eventName}`);
	if (!isString(eventName, { lowerCase: true })) {
		ghactionsWarning(`Event name \`${eventName}\` is recommended to keep in lower case to prevent issues!`);
	}
	let keyRaw = ghactionsGetInput("key");
	if (!isString(keyRaw, { pattern: iftttMakerURLRegExp })) {
		throw new TypeError(`Input \`key\` is not a valid IFTTT webhook key!`);
	}
	let key = keyRaw.match(iftttMakerURLRegExp).groups.key;
	ghactionsSetSecret(key);
	let arbitrary = ghactionsGetBooleanInput("arbitrary");
	if (typeof arbitrary !== "boolean") {
		throw new TypeError(`Input \`arbitrary\` must be type of boolean!`);
	}
	let payloadRaw = ghactionsGetInput("payload");
	let payload = isStringifyJSON(payloadRaw, {
		allowEmpty: true,
		arrayRoot: false
	}) ? JSON.parse(payloadRaw) : yaml.parse(payloadRaw);
	if (!isJSON(payload, {
		allowEmpty: true,
		arrayRoot: false
	})) {
		throw new TypeError(`\`${payload}\` is not a valid IFTTT webhook JSON/YAML/YML payload!`);
	}
	let payloadStringify = JSON.stringify(payload);
	console.log(`${chalk.bold("Payload:")} ${payloadStringify}`);
	ghactionsEndGroup();
	ghactionsStartGroup(`Post network request to IFTTT.`);
	let response = await nodeFetch(`https://maker.ifttt.com/trigger/${eventName}${arbitrary ? "/json" : ""}/with/key/${key}`, {
		body: payloadStringify,
		follow: 1,
		headers: {
			"Content-Type": "application/json",
			"User-Agent": `TriggerIFTTTWebhookApplet.GitHubAction/5.0.2 NodeJS/${process.versions.node}-${process.platform}-${process.arch}`
		},
		method: "POST",
		redirect: "follow"
	}).catch((reason) => {
		throw new Error(`Unexpected web request issue: ${reason?.message ?? reason}`);
	});
	let responseText = await response.text();
	ghactionsSetOutput("response", responseText);
	ghactionsSetOutput("status_code", response.status);
	ghactionsSetOutput("status_ok", response.ok);
	ghactionsSetOutput("status_text", response.statusText);
	if (!response.ok) {
		throw new Error(`Unexpected response status \`${response.status} ${response.statusText}\`: ${responseText}`);
	}
	console.log(`${chalk.bold("Response Status:")} ${response.status} ${response.statusText}`);
	console.log(`${chalk.bold("Response Content:")} ${responseText}`);
	ghactionsEndGroup();
} catch (error) {
	ghactionsError(error?.message ?? error);
	ghactionsEndGroup();
	process.exit(1);
}
