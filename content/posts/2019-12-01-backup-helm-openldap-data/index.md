---
title: Backup helm's stable/openldap's data!
date: 2019-12-01T22:15:04.207Z
cover: /assets/sergio-souza-luiyb9pj9dk-unsplash.jpg
tags:
  - k8s
  - openldap
  - helm
post_name: backup-helm-openldap-data
author: halkeye
category: Coding
---
This has been on my todo list since August, and I accdently wiped out my install this week, so its super motivated me to get something in place.

Is it perfect? no

Is it insecure? Probably

Does it work? yesssssss

```
cat openldap-backup-cronjob.yaml
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: openldap-backup-pvc
  namespace: openldap
spec:
  accessModes:
    - ReadWriteMany
  storageClassName: nfs-client
  resources:
    requests:
      storage: 5Gi
---
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: openldapbackup-cron-job
  namespace: openldap
spec:
  schedule: "0 */12 * * *"
  failedJobsHistoryLimit: 5
  successfulJobsHistoryLimit: 2
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: openldapsql-backup
              env:
                - name: LDAP_ADMIN_PASSWORD
                  valueFrom:
                    secretKeyRef:
                      name: openldap
                      key: LDAP_ADMIN_PASSWORD
              image: osixia/openldap:1.2.4
              command:
                - "/bin/sh"
              args:
                - "-c"
                - "ldapsearch -x -H ldap://openldap -b dc=gavinmogan,dc=com -D \"cn=admin,dc=gavinmogan,dc=com\" -w \"${LDAP_ADMIN_PASSWORD}\" | tee /backup/backupOn`date +%Y-%m-%d-%H-%M`.dump > /dev/null"
              volumeMounts:
                - mountPath: "/backup"
                  name: backup-volume
          volumes:
            - name: backup-volume
              persistentVolumeClaim:
                claimName: openldap-backup-pvc

```
