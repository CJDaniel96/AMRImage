# AMR Image Service

AMR Image Service is a web interface service for downloading AMR images.

## Project Description

This service provides a web interface for downloading AMR images. It is written in Go and runs as a Windows service.

## Installation

### Prerequisites

- [Go](https://golang.org/dl/) 1.16 or higher
- Windows operating system

### Steps

1. Clone the project to your local machine:

    ```sh
    git clone https://github.com/yourusername/amr-image-service.git
    cd amr-image-service
    ```

2. Build the project:

    ```sh
    go build -o amr-image-service.exe
    ```

3. Configure the service:

    Ensure the `configs/configs.json` file exists and is correctly configured.

4. Install the service:

    ```sh
    amr-image-service.exe install
    ```

5. Start the service:

    ```sh
    amr-image-service.exe start
    ```

## Usage

Once the service is started, you can access it via a web browser at:

http://<host>:<port>

Where `<host>` and `<port>` are configured in the `configs/configs.json` file.

## Accessing Swagger UI

Swagger UI is available at:

http://<host>:<port>/swagger/index.html

This provides a web-based interface to interact with the API endpoints.

## Configuration

The configuration file is located at `configs/configs.json`. Example:

```json
{
    "App": {
        "Host": "localhost",
        "Port": 8080
    }
}
```

## Logging

The service logs are recorded in the service's running directory. Ensure the log folder has write permissions.

## FAQ

The service fails to start with error 1067

Ensure the configuration file configs/configs.json exists and is correctly formatted.
Check the log files for more error information.
Ensure the service has sufficient permissions to access required resources.

How to uninstall the service?

```sh
amr-image-service.exe uninstall
```

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to adjust the content according to your project's specific requirements and configuration paths. This template provides a basic framework to help users quickly understand and use your service.