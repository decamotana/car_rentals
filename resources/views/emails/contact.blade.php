<!DOCTYPE html>
<html>

<head>
    <title>New Contact Message</title>
</head>

<body>
    <h2>J&A Car Rental</h2>
    <p><strong>Email:</strong> {{ $data['email'] }}</p>
    <p><strong>Subject:</strong> {{ $data['subject'] }}</p>
    <p><strong>Body:</strong> {{ $data['body'] }}</p>
    <p>this message is no-reply</p>
</body>

</html>