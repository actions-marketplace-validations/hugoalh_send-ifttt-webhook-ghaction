param (
	[Parameter()][string]$arbitrary,
	[Parameter()][string]$dryRun,
	[Parameter(Mandatory = $true, Position = 0)][ValidatePattern("^[\da-zA-Z_-]+$")][string]$eventName,
	[Parameter(Mandatory = $true, Position = 1)][ValidatePattern("^[\da-zA-Z_-]+$")][string]$key,
	[Parameter(Position = 2, ValueFromPipeline = $true)][ValidateNotNullOrEmpty()][string]$payload
)
$arbitraryBoolean = [bool]::Parse($arbitrary)
$dryRunBoolean = [bool]::Parse($dryRun)
$payloadJSON = ConvertFrom-Json -InputObject $payload
$payloadStringify = ConvertTo-Json -InputObject $payloadJSON -Compress
$ghactionUserAgent = "TriggerIFTTTWebhookApplet.GitHubAction/4.0.0"
if ($dryrun -eq $true) {
	Write-Output -InputObject "Event Name: $eventName"
	Write-Output -InputObject "Payload Content: $payloadStringify"
	Write-Output -InputObject "Payload Length: $($payloadStringify.Length)"
	$payloadFakeStringify = "{`"body`": `"bar`",`"title`": `"foo`",`"userId`": 1}"
	Write-Output -InputObject "Post network request to test service."
	Invoke-WebRequest -UseBasicParsing -Uri "https://jsonplaceholder.typicode.com/posts" -UserAgent $ghactionUserAgent -Headers @{ "Content-Length" = $($payloadFakeStringify.Length) } -Method Post -Body $payloadFakeStringify -ContentType "application/json"
} else {
	Write-Output -InputObject "::debug::Event Name: $eventName"
	Write-Output -InputObject "::debug::Payload Content: $payloadStringify"
	Write-Output -InputObject "::debug::Payload Length: $($payloadStringify.Length)"
	Write-Output -InputObject "Post network request to IFTTT."
	$webRequestURL = "https://maker.ifttt.com/trigger/$eventname"
	if ($arbitrary -eq $true) {
		$webRequestURL += "/json"
	}
	$webRequestURL += "/with/key/$key"
	Invoke-WebRequest -UseBasicParsing -Uri $webRequestURL -UserAgent $ghactionUserAgent -Headers @{ "Content-Length" = $($payloadStringify.Length) } -Method Post -Body $payloadStringify -ContentType "application/json"
}