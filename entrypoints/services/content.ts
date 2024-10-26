function getLatestContentAndName() {
    const commentaryDiv = document.querySelectorAll(".update-components-text.update-components-update-v2__commentary");

    const nameElement = document.querySelectorAll(".t-14.t-bold.hoverable-link-text.t-black");
    const contentArray: string[] = [];
    
    // Retrieve the name if the element is found
    const name = nameElement.length > 0 ? nameElement[nameElement.length-2].textContent?.trim() : "Name not found";
    
    // Get content from the latest div
    const latestDiv = commentaryDiv[commentaryDiv.length - 1];
    if (latestDiv) {
        const content = (latestDiv as HTMLElement).innerText;
        if (content.length > 4000) {
            const chunks = content.match(/.{1,4000}/g) || [];
            contentArray.push(...chunks);
        } else {
            contentArray.push(content);
        }
    }
    let formattedContent=contentArray.map(formatToSingleLine);
    return { name, content: formattedContent };
}

function formatToSingleLine(text: string) {
    // Replace line breaks and tabs with a single space
    let singleLineText = text.replace(/\s+/g, ' ');
    
    // Trim any leading or trailing whitespace
    return singleLineText.trim();
}

export default getLatestContentAndName