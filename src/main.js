import { endGroup as ghactionsEndGroup, error as ghactionsError, getBooleanInput as ghactionsGetBooleanInput, getInput as ghactionsGetInput, setOutput as ghactionsSetOutput, startGroup as ghactionsStartGroup } from "@actions/core";
import IFTTTWebhook from "@hugoalh/send-ifttt-webhook";
import yaml from "yaml";
try {
	ghactionsStartGroup(`Import inputs.`);
	let key = ghactionsGetInput("key", { required: true });
	let eventName = ghactionsGetInput("eventname", { required: true });
	let arbitrary = ghactionsGetBooleanInput("arbitrary", { required: true });
	let payload = yaml.parse(ghactionsGetInput("payload", { required: true })) ?? {};
	ghactionsEndGroup();
	ghactionsStartGroup(`Send a webhook to IFTTT.`);
	let iftttWebhookInstance = new IFTTTWebhook(key);
	let response = await (arbitrary ? iftttWebhookInstance.sendArbitrary(eventName, payload) : iftttWebhookInstance.send(eventName, payload));
	let responseText = await response.text();
	ghactionsSetOutput("response", responseText);
	ghactionsSetOutput("status_code", response.status);
	ghactionsSetOutput("status_ok", response.ok);
	ghactionsSetOutput("status_text", response.statusText);
	if (!response.ok) {
		throw new Error(`Unexpected response status \`${response.status} ${response.statusText}\`: ${responseText}`);
	}
	console.log(`Response Status  : ${response.status} ${response.statusText}`);
	console.log(`Response Content : ${responseText}`);
	ghactionsEndGroup();
} catch (error) {
	ghactionsError(error?.message ?? error);
	ghactionsEndGroup();
	process.exit(1);
}
