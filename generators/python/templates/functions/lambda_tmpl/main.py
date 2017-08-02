"""
Lambda example with external dependency
"""

import logging
import requests
import boto3


logger = logging.getLogger()
logger.setLevel(logging.INFO)

# MUST include "handle" function
def handle(event, context):
    """
    Lambda handler
    """
    logger.info("%s - %s", event, context)

    url = "https://api.ipify.org?format=json"

    raw = requests.get(url)
    logger.info("%s", raw)
    result = raw.json()

    logger.info("Lambda IP: %s", result['ip'])

    return event
