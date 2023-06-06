import { endGroup as ghactionsEndGroup, error as ghactionsError, getBooleanInput as ghactionsGetBooleanInput, getInput as ghactionsGetInput, setOutput as ghactionsSetOutput, setSecret as ghactionsSetSecret, startGroup as ghactionsStartGroup } from "@actions/core";
import { isJSON, isString, isStringifyJSON } from "@hugoalh/advanced-determine";
import nodeFetch from "node-fetch";
import yaml from "yaml";
const iftttMakerURLRegExp = /^(?:https:\/\/maker\.ifttt\.com\/use\/)?(?<key>(?:[\dA-Za-z][\dA-Za-z_-]*)?[\dA-Za-z])$/u;
try {
	ghactionsStartGroup(`Import inputs.`);
	let eventName = ghactionsGetInput("eventname");
	if (!isString(eventName, { pattern: /^(?:[\dA-Za-z][\dA-Za-z_]*)?[\dA-Za-z]$/u })) {
		throw new TypeError(`\`${eventName}\` is not a valid IFTTT webhook event name!`);
	}
	console.log(`Event Name: "${eventName}"`);
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
	console.log(`Arbitrary: ${arbitrary}`);
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
	console.log(`Payload: ${payloadStringify}`);
	ghactionsEndGroup();
	ghactionsStartGroup(`Post network request to IFTTT.`);
	let response = await nodeFetch(`https://maker.ifttt.com/trigger/${eventName}${arbitrary ? "/json" : ""}/with/key/${key}`, {
		body: payloadStringify,
		follow: 1,
		headers: {
			"Content-Type": "application/json",
			"User-Agent": `NodeJS/${process.versions.node}-${process.platform}-${process.arch} SendIFTTTWebhook.GitHubAction/5.0.5`
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
	console.log(`Response Status: ${response.status} ${response.statusText}`);
	console.log(`Response Content: ${responseText}`);
	ghactionsEndGroup();
} catch (error) {
	ghactionsError(error?.message ?? error);
	ghactionsEndGroup();
	process.exit(1);
}
