import json, sys, re

def parse_issue(body):
    entries = []
    for line in body.splitlines():
        url_match = re.search(r'(https?://\S+)', line)
        if not url_match: continue
        url = url_match.group(1)
        entry = {
            "title": url,
            "speaker": "",
            "platform": "YouTube" if "youtu" in url else "Other",
            "url": url,
            "type": [],
            "domain": [],
            "level": [],
            "year": None
        }
        tags = re.findall(r'#(\w+):([\w-]+)', line)
        for tag, val in tags:
            if tag == "type": entry["type"].append(val)
            elif tag == "domain": entry["domain"].append(val)
            elif tag == "level": entry["level"].append(val)
            elif tag == "year": entry["year"] = val
        entries.append(entry)
    return entries

if __name__ == "__main__":
    issue_body = sys.argv[1]
    with open("tutorials.json") as f:
        data = json.load(f)
    data.extend(parse_issue(issue_body))
    with open("tutorials.json","w") as f:
        json.dump(data, f, indent=2)
